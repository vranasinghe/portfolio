const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let checks = 0;
const check = (condition, label) => { assert.ok(condition, label); checks++; };
function load(file, mocks = {}, env = {}, fetcher = global.fetch, moduleCache = {}) {
  if (moduleCache[file]) return moduleCache[file].exports;
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  moduleCache[file] = mod;
  const req = name => name.endsWith('.json') && name.startsWith('.') ? JSON.parse(fs.readFileSync(path.resolve(root, path.dirname(file), name), 'utf8')) : name in mocks ? mocks[name] : name.startsWith('@/') ? load(name.slice(2) + '.ts', mocks, env, fetcher, moduleCache) : require(name);
  vm.runInNewContext('(function(require,module,exports,process,fetch){' + code + '\n})', { console, Buffer, Date: mocks.__Date || Date, Map, URL, TextDecoder, Uint8Array, AbortSignal, Request, Response, setTimeout, clearTimeout })(req, mod, mod.exports, { env, cwd: () => root }, fetcher);
  return mod.exports;
}
const request = (body, headers = {}) => new Request('http://localhost:3001/api/test', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
async function main() {
  const { getStats } = load('lib/githubActivity.ts');
  const days = counts => counts.map((count, i) => ({ date: `2024-01-0${i + 1}`, count, weekday: i, level: count ? 1 : 0 }));
  check(getStats(days([1, 2, 0])).current === 2, 'Today grace');
  check(getStats(days([1, 2, 0]), false).current === 0, 'Historical year has no grace');
  check(getStats(days([0, 0])).total === 0 && getStats(days([0, 0])).longest === 0, 'Zero contributions');
  check(getStats(days([1, 1, 0, 3])).longest === 2 && getStats(days([1, 1, 0, 3])).active === 3, 'Longest and active days');
  const renderer = load('components/github/ReferenceSkyline.tsx');
  const grid = renderer.buildGrid([{ date: '2024-02-29', count: 7 }], Date.UTC(2024, 11, 31), 0, Date.UTC(2024, 0, 1));
  check(grid.cells.some(d => d.date === '2024-02-29' && d.count === 7), 'Leap day retained');
  check(grid.cells.filter(d => d.date.startsWith('2024')).length === 366, 'All leap year days');
  check(grid.cells[0].day === 0 && grid.cells.at(-1).date === '2024-12-31', 'Partial weeks align');
  const apiRequest = year => new (require('next/server').NextRequest)(`http://localhost:3001/api/github-activity?year=${year}`);
  let calls = 0;
  const offline = async () => { calls++; throw new Error('No network in tests'); };
  let api = load('app/api/github-activity/route.ts', {}, {}, offline);
  check((await api.GET(apiRequest('invalid'))).status === 400, 'Invalid year');
  check((await api.GET(apiRequest(2024))).status === 503 && calls === 0, 'Missing token avoids fetch');
  for (const status of [403, 429, 500]) {
    api = load('app/api/github-activity/route.ts', {}, { GITHUB_TOKEN: 'test-only' }, async () => new Response('{}', { status }));
    check((await api.GET(apiRequest(2024))).status === 503, 'Controlled upstream failure ' + status);
  }
  const calendar = [];
  for (let i = 0; i < 366; i++) { const d = new Date(Date.UTC(2024, 0, i + 1)); calendar.push({ date: d.toISOString().slice(0, 10), contributionCount: i === 59 ? 7 : 0, contributionLevel: i === 59 ? 'FIRST_QUARTILE' : 'NONE', weekday: d.getUTCDay() }); }
  let fail = false;
  const testEnv = { GITHUB_TOKEN: 'test-only', GITHUB_USERNAME: 'vranasinghe' };
  api = load('app/api/github-activity/route.ts', {}, testEnv, async () => { calls++; return fail ? new Response('{}', { status: 429 }) : Response.json({ data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: 7, weeks: [{ contributionDays: calendar }] } } } } }); });
  let result = await api.GET(apiRequest(2024));
  check(result.status === 200 && (await result.json()).days.length === 366, 'Complete GraphQL year accepted');
  const before = calls; await api.GET(apiRequest(2024)); check(calls === before, 'Fresh cache reused');
  testEnv.GITHUB_USERNAME = 'another-user'; fail = true; check((await api.GET(apiRequest(2024))).status === 503, 'Username cache isolation');
  let clock = Date.UTC(2026, 10, 25);
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [clock])); } static now() { return clock; } }
  let unavailable = false;
  const cached = load('app/api/github-activity/route.ts', { __Date: Clock }, { GITHUB_TOKEN: 'test' }, async () => unavailable ? new Response('{}', { status: 429 }) : Response.json({ data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: 7, weeks: [{ contributionDays: calendar }] } } } } }));
  await cached.GET(apiRequest(2024)); clock += 3600001; unavailable = true;
  result = await cached.GET(apiRequest(2024)); check(result.status === 200 && (await result.json()).stale === true, 'Expired cache disclosed on rate limit');
  const { readSubmission, publicUrl } = load('lib/requestSafety.ts');
  for (const [req, status] of [[request({}, { origin: 'https://untrusted.example' }), 403], [request('x'.repeat(17000)), 413], [request('{'), 400]]) {
    try { await readSubmission(req); assert.fail('Expected rejection'); } catch (e) { check(e.status === status, 'Bounded JSON/origin ' + status); }
  }
  for (const url of ['javascript:alert(1)', 'data:text/html,x', 'https://user:password@example.com']) { try { publicUrl(url); assert.fail('Expected rejection'); } catch (e) { check(e.status === 400, 'Unsafe URL'); } }
  let sent = 0;
  const contact = load('app/api/contact/route.ts', { resend: { Resend: class { emails = { send: async payload => { sent++; check(payload.to === 'owner@example.com', 'Only owner receives'); return { error: null }; } }; } } }, { RESEND_API_KEY: 'test-only', CONTACT_TO_EMAIL: 'owner@example.com' });
  check((await contact.POST(request({ name: 'Test', email: 'bad', message: 'Test' }))).status === 400, 'Contact validation');
  const goodContact = { name: 'Test', email: 'visitor@example.com', message: 'Test' };
  result = await contact.POST(request(goodContact)); check(result.status === 200 && sent === 1 && !(await result.json()).confirmationSent, 'No visitor confirmation email');
  const badProvider = load('app/api/contact/route.ts', { resend: { Resend: class { emails = { send: async () => { throw new Error(); } }; } } }, { RESEND_API_KEY: 'test', CONTACT_TO_EMAIL: 'owner@example.com' });
  check((await badProvider.POST(request(goodContact))).status === 502, 'Provider exception controlled');
  for (let i = 0; i < 5; i++) result = await contact.POST(request(goodContact));
  check(result.status === 429, 'Contact throttle');
  const mails = [];
  const mailer = fail => ({ Resend: class { emails = { send: async payload => { if (fail) throw new Error(); mails.push(payload); return { error: null }; } }; } });
  const baseReviewEnv = { REVIEW_INVITE_SECRET: 'a'.repeat(32), RESEND_API_KEY: 'test-only', CONTACT_TO_EMAIL: 'owner@example.com' };
  const reviewEnv = { ...baseReviewEnv, SUPABASE_URL: 'https://test-project.supabase.co/rest/v1/', SUPABASE_SECRET_KEY: 'sb_secret_mock' };
  // In-memory stand-in for the Supabase REST API (PostgREST) reviews table.
  const supabase = (rows = []) => {
    const db = { rows, calls: [], down: false };
    db.fetch = async (url, options = {}) => {
      db.calls.push({ url, ...options });
      if (db.down) return Response.json({ message: 'boom' }, { status: 500 });
      const u = new URL(url), method = options.method || 'GET';
      if (!u.pathname.startsWith('/rest/v1/reviews') || options.headers.apikey !== 'sb_secret_mock') return Response.json({ code: 'PGRST301' }, { status: 401 });
      if (method === 'GET') {
        const status = u.searchParams.get('status');
        const list = db.rows.filter(r => !status || 'eq.' + r.status === status).sort((a, b) => b.created_at.localeCompare(a.created_at));
        return Response.json(list);
      }
      if (method === 'POST') {
        const row = JSON.parse(options.body);
        if (db.rows.some(r => r.invite_id === row.invite_id)) return Response.json({ code: '23505', message: 'duplicate key' }, { status: 409 });
        const saved = { id: require('node:crypto').randomUUID(), created_at: new Date().toISOString(), ...row };
        db.rows.push(saved);
        return Response.json([saved], { status: 201 });
      }
      if (method === 'DELETE') {
        const id = (u.searchParams.get('id') || '').replace(/^eq\./, '');
        const removed = db.rows.filter(r => r.id === id); db.rows = db.rows.filter(r => r.id !== id);
        return Response.json(removed);
      }
      return Response.json({}, { status: 405 });
    };
    return db;
  };
  const store = supabase();
  const reviews = load('app/api/reviews/route.ts', { resend: mailer(false) }, reviewEnv, store.fetch);
  const invites = load('lib/reviewInvite.ts', {}, reviewEnv);
  const token = invites.createInvite({ name: 'Client', project: 'Project' });
  const payload = invites.verifyInvite(token).payload;
  const goodReview = { inviteToken: token, name: 'Test <b>', comment: 'Test only', rating: 4 };
  for (const body of [{ ...goodReview, role: {} }, { ...goodReview, rating: 1.5 }, { ...goodReview, avatarUrl: 'javascript:x' }]) check((await reviews.POST(request(body))).status === 400, 'Review input rejection');
  check(!store.calls.length, 'Rejected input never reaches Supabase');
  result = await reviews.POST(request(goodReview)); const sentReview = await result.json();
  check(result.status === 200 && sentReview.published && typeof sentReview.review.id === 'string', 'Invited review published immediately');
  check(store.rows.length === 1 && store.rows[0].invite_id === payload.id && store.rows[0].name === 'Test <b>' && store.rows[0].status === 'published' && store.rows[0].verified === true, 'Review saved to Supabase as submitted');
  check(store.calls[0].url.startsWith('https://test-project.supabase.co/rest/v1/reviews') && !store.calls[0].headers.Authorization, 'URL with /rest/v1/ suffix normalized; secret key sent only as apikey');
  check((await (await reviews.GET()).json()).reviews.some(r => r.id === store.rows[0].id && r.name === 'Test <b>'), 'Published review listed right away');
  store.rows.push({ ...store.rows[0], id: '00000000-0000-4000-8000-000000000001', invite_id: 'hidden01', name: 'Hidden one', status: 'hidden' });
  check(!(await (await reviews.GET()).json()).reviews.some(r => r.name === 'Hidden one'), 'Hidden reviews not listed publicly');
  store.rows.pop();
  result = await reviews.POST(request({ ...goodReview, comment: 'Second try' }));
  check(result.status === 410 && store.rows.length === 1 && (await result.json()).error.includes('already been used'), 'Invite link works only once');
  check(mails.length === 1 && mails[0].to === 'owner@example.com', 'Owner notified only');
  check(!mails[0].html.includes('Test <b>') && mails[0].text.includes('/admin/reviews'), 'Notification escaped with removal instructions');
  const freshInvite = () => ({ ...goodReview, inviteToken: invites.createInvite({ name: 'Client' }) });
  const unconfigured = supabase();
  result = await load('app/api/reviews/route.ts', { resend: mailer(false) }, baseReviewEnv, unconfigured.fetch).POST(request(freshInvite()));
  check(result.status === 503 && !unconfigured.calls.length && !(await result.json()).error.includes('SUPABASE'), 'Missing storage config honest without leaking setup details');
  check((await load('app/api/reviews/route.ts', { resend: mailer(false) }, { ...reviewEnv, SUPABASE_SECRET_KEY: undefined, SUPABASE_SERVICE_ROLE_KEY: 'sb_secret_mock' }, store.fetch).POST(request(freshInvite()))).status === 200, 'Key saved as SUPABASE_SERVICE_ROLE_KEY also accepted');
  result = await load('app/api/reviews/route.ts', { resend: mailer(false) }, baseReviewEnv).GET();
  check(result.status === 200 && Array.isArray((await result.json()).reviews), 'Listing falls back to bundled reviews without storage config');
  const outage = supabase(); outage.down = true;
  result = await load('app/api/reviews/route.ts', { resend: mailer(false) }, reviewEnv, outage.fetch).GET();
  check(result.status === 200 && Array.isArray((await result.json()).reviews), 'Listing survives a Supabase outage');
  check((await load('app/api/reviews/route.ts', { resend: mailer(false) }, reviewEnv, outage.fetch).POST(request(freshInvite()))).status === 502, 'Storage failure honest');
  const rowsBefore = store.rows.length;
  check((await load('app/api/reviews/route.ts', { resend: mailer(true) }, reviewEnv, store.fetch).POST(request(freshInvite()))).status === 200 && store.rows.length === rowsBefore + 1, 'Email failure does not block publishing');
  check((await load('app/api/reviews/route.ts', { resend: mailer(false) }, reviewEnv, async () => Response.json({ code: 'PGRST205' }, { status: 404 })).POST(request(freshInvite()))).status === 503, 'Missing table reported as unavailable');
  mails.length = 1;
  check(invites.verifyInvite(token).ok, 'Valid invite');
  const [part, signature] = token.split('.');
  const tampered = Buffer.from(JSON.stringify({ ...payload, name: 'Other' })).toString('base64url') + '.' + signature;
  const signed = load('lib/signedToken.ts', {}, reviewEnv);
  const expired = signed.signToken('invite:', { ...payload, exp: 1 });
  for (const bad of [tampered, part + '.' + (signature[0] === 'A' ? 'B' : 'A') + signature.slice(1), expired, '', 'garbage', null, [], token + '.x']) check(!invites.verifyInvite(bad).ok, 'Invalid invite rejected');
  check(invites.verifyInvite(expired).reason === 'expired', 'Expiry distinguished');
  for (const secret of [undefined, 'short']) check(!load('lib/reviewInvite.ts', {}, { REVIEW_INVITE_SECRET: secret }).verifyInvite(token).ok, 'Secret fails closed');
  for (const inviteToken of [undefined, 'bad', expired]) check((await reviews.POST(request({ ...goodReview, inviteToken }))).status === 403, 'Invite required before submission');
  check(mails[0].text.includes(payload.id) && mails[0].html.includes(payload.id), 'Invite id in email');
  const adminEnv = { ...baseReviewEnv, ADMIN_PASSWORD: 'test-password-only' };
  const sessions = load('lib/adminSession.ts', {}, adminEnv);
  const login = load('app/api/admin/login/route.ts', {}, adminEnv);
  result = await login.POST(request({ password: 'wrong' })); check(result.status === 401, 'Wrong password');
  result = await login.POST(request({ password: adminEnv.ADMIN_PASSWORD }));
  check(result.status === 200 && /HttpOnly/i.test(result.headers.get('set-cookie')), 'Login sets HttpOnly cookie');
  for (let i = 0; i < 5; i++) result = await login.POST(request({ password: 'wrong' }));
  check(result.status === 429, 'Sixth failed login throttled');
  for (const env of [{}, { ADMIN_PASSWORD: 'x' }, { REVIEW_INVITE_SECRET: adminEnv.REVIEW_INVITE_SECRET }]) check((await load('app/api/admin/login/route.ts', {}, env).POST(request({ password: 'x' }))).status === 503, 'Missing admin config');
  const create = load('app/api/admin/review-invite/route.ts', {}, adminEnv);
  const adminRequest = (cookie, projectUrl = "https://example.com/project") => new (require('next/server').NextRequest)('https://preview.example/api/admin/review-invite', { method: 'POST', headers: { 'content-type': 'application/json', ...(cookie && { cookie: 'vr_admin=' + cookie }) }, body: JSON.stringify({ name: 'Client', project: 'Project', projectUrl, days: 14 }) });
  for (const cookie of [undefined, 'forged', token]) check((await create.POST(adminRequest(cookie))).status === 401, 'Admin session required');
  const cookie = sessions.createSessionCookieValue();
  check(sessions.isAdmin(cookie) && !sessions.isAdmin(expired), 'Session purpose separated');
  result = await create.POST(adminRequest(cookie));
  const link = await result.json();
  check(result.status === 200 && new URL(link.url).origin === 'https://preview.example' && invites.verifyInvite(new URL(link.url).searchParams.get('invite')).ok, 'Admin creates working preview invite');
  const projectInvite = invites.verifyInvite(new URL(link.url).searchParams.get('invite'));
  check(projectInvite.ok && projectInvite.payload.projectUrl === 'https://example.com/project', 'Project URL preserved in signed invite');
  for (const unsafe of ['javascript:alert(1)', 'https://user:password@example.com']) check((await create.POST(adminRequest(cookie, unsafe))).status === 400, 'Unsafe invite project URL rejected');
  check(!invites.verifyInvite(signed.signToken('invite:', { ...payload, projectUrl: 'javascript:alert(1)' })).ok, 'Unsafe signed project URL rejected');
  const manageEnv = { ...adminEnv, SUPABASE_URL: 'https://test-project.supabase.co', SUPABASE_SECRET_KEY: 'sb_secret_mock' };
  const keepId = '11111111-1111-4111-8111-111111111111', dropId = '22222222-2222-4222-8222-222222222222';
  const baseRow = { invite_id: 'aaaa0001', name: 'Client', role: 'Founder', company: 'Project', service: 'Full-Stack Web App', rating: 5, comment: 'Great work', avatar_url: null, linkedin_url: null, project_url: null, verified: true, status: 'published', created_at: '2026-11-01T00:00:00Z' };
  const adminStore = supabase([{ ...baseRow, id: dropId }, { ...baseRow, id: keepId, invite_id: 'aaaa0002', name: 'Keep me', status: 'hidden' }]);
  const managed = load('app/api/admin/reviews/route.ts', {}, manageEnv, adminStore.fetch);
  const managedRequest = (method, body, adminCookie = cookie, origin = 'https://admin.example') => new (require('next/server').NextRequest)('https://admin.example/api/admin/reviews', { method, headers: { 'content-type': 'application/json', origin, ...(adminCookie && { cookie: 'vr_admin=' + adminCookie }) }, ...(method !== 'GET' && { body: JSON.stringify(body) }) });
  for (const badCookie of ['', 'forged']) {
    check((await managed.GET(managedRequest('GET', null, badCookie))).status === 401, 'Review list protected');
    check((await managed.DELETE(managedRequest('DELETE', { id: dropId }, badCookie))).status === 401, 'Deletion protected');
  }
  check(!adminStore.calls.length, 'Unauthorized requests never reach Supabase');
  check((await managed.DELETE(managedRequest('DELETE', { id: dropId }, cookie, 'https://evil.example'))).status === 403, 'Cross-origin deletion blocked');
  check(!adminStore.calls.length, 'CSRF blocked before Supabase');
  check((await load('app/api/admin/reviews/route.ts', {}, adminEnv, adminStore.fetch).GET(managedRequest('GET'))).status === 503, 'Management fails closed without Supabase config');
  result = await managed.GET(managedRequest('GET')); const listing = await result.json();
  check(result.status === 200 && listing.reviews.length === 2 && listing.reviews.some(r => r.status === 'hidden') && result.headers.get('cache-control') === 'no-store', 'Admin lists all reviews, including hidden, without caching');
  check((await managed.DELETE(managedRequest('DELETE', { id: "x' or 1=1" }))).status === 400 && adminStore.rows.length === 2, 'Non-UUID id rejected before Supabase');
  check((await managed.DELETE(managedRequest('DELETE', { id: '33333333-3333-4333-8333-333333333333' }))).status === 404, 'Missing review reported');
  result = await managed.DELETE(managedRequest('DELETE', { id: dropId }));
  check(result.status === 200 && adminStore.rows.length === 1 && adminStore.rows[0].id === keepId, 'Only chosen review deleted');
  adminStore.down = true;
  check((await managed.GET(managedRequest('GET'))).status === 502, 'Supabase failure controlled');
  check((await load('app/api/admin/reviews/route.ts', {}, manageEnv, async () => { throw new Error('network'); }).GET(managedRequest('GET'))).status === 502, 'Network failure controlled');
  check((await load('app/api/admin/reviews/route.ts', {}, manageEnv, async () => Response.json({}, { status: 401 })).GET(managedRequest('GET'))).status === 503, 'Rejected key reported as configuration problem');
  const data = load('data/portfolio.ts');
  check(data.featuredProjects.length === 4 && data.minorProjects.length === 8, 'All twelve projects retained');
  check(new Set([...data.featuredProjects, ...data.minorProjects].map(p => p.title)).size === 12, 'No duplicate projects');
  check(!JSON.stringify(data.featuredProjects).match(/94\.7|40%|55%|100K|Lead ML Engineer/), 'Unsupported claims removed');
  const vee = load('lib/veeBrain.ts');
  check(vee.veeReply('github activity').actions.some(action => action.href === '#github-activity'), 'Vee activity navigation');
  check(!vee.veeReply('internship').text.includes('available for 2026'), 'Vee confirms availability with owner');
  check(!fs.existsSync(path.join(root, 'app/projects/[slug]/page.tsx')), 'No case study routes');
  console.log(`Passed ${checks} focused assertions. APIs/providers/storage mocked; no real email, GitHub or Supabase request sent.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
