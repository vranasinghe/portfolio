const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
let checks = 0;
const check = (condition, label) => { assert.ok(condition, label); checks++; };
function load(file, mocks = {}, env = {}, fetcher = global.fetch) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  const req = name => name in mocks ? mocks[name] : name.startsWith('@/') ? load(name.slice(2) + '.ts', mocks, env, fetcher) : require(name);
  vm.runInNewContext('(function(require,module,exports,process,fetch){' + code + '\n})', { console, Date: mocks.__Date || Date, Map, URL, TextDecoder, Uint8Array, AbortSignal, Request, Response, setTimeout, clearTimeout })(req, mod, mod.exports, { env, cwd: () => root }, fetcher);
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
  const reviewEnv = { RESEND_API_KEY: 'test-only', CONTACT_TO_EMAIL: 'owner@example.com' };
  const reviews = load('app/api/reviews/route.ts', { resend: mailer(false) }, reviewEnv);
  const goodReview = { name: 'Test <b>', comment: 'Test only', rating: 4 };
  for (const body of [{ ...goodReview, role: {} }, { ...goodReview, rating: 1.5 }, { ...goodReview, avatarUrl: 'javascript:x' }]) check((await reviews.POST(request(body))).status === 400, 'Review input rejection');
  result = await reviews.POST(request(goodReview)); const sentReview = await result.json();
  check(result.status === 200 && sentReview.pending && !sentReview.review, 'Review queued for approval, not published');
  check(mails.length === 1 && mails[0].to === 'owner@example.com', 'Review emailed only to owner');
  check(!mails[0].html.includes('Test <b>') && mails[0].text.includes('APPROVED_REVIEWS'), 'Review email escaped with paste instructions');
  check((await (await reviews.GET()).json()).reviews.length === 0, 'Only approved reviews are listed');
  check((await load('app/api/reviews/route.ts', { resend: mailer(false) }, {}).POST(request(goodReview))).status === 503, 'Missing email config honest');
  check((await load('app/api/reviews/route.ts', { resend: mailer(true) }, reviewEnv).POST(request(goodReview))).status === 502, 'Review provider failure honest');
  const data = load('data/portfolio.ts');
  check(data.featuredProjects.length === 4 && data.minorProjects.length === 8, 'All twelve projects retained');
  check(new Set([...data.featuredProjects, ...data.minorProjects].map(p => p.title)).size === 12, 'No duplicate projects');
  check(!JSON.stringify(data.featuredProjects).match(/94\.7|40%|55%|100K|Lead ML Engineer/), 'Unsupported claims removed');
  const vee = load('lib/veeBrain.ts');
  check(vee.veeReply('github activity').actions.some(action => action.href === '#github-activity'), 'Vee activity navigation');
  check(!vee.veeReply('internship').text.includes('available for 2026'), 'Vee confirms availability with owner');
  check(!fs.existsSync(path.join(root, 'app/projects/[slug]/page.tsx')), 'No case study routes');
  console.log(`Passed ${checks} focused assertions. APIs/providers/storage mocked; no real email or GitHub request sent.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
