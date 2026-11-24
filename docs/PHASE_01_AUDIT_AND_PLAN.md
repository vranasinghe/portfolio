# Phase 01 audit and proposed implementation plan

Date: 2026-11-25. Status: pre-implementation review; awaiting approval of the plan below.

## Scope and evidence

Reviewed the App Router composition, global styles, metadata, named section components, shared content/interfaces, navigation and section tracking, Vee knowledge/classification, contribution API and canvas renderer, contact/reviews APIs, environment example, package scripts, CI workflow, Next configuration, existing hierarchy documentation/checks, and public asset inventory. This is a source-level baseline, not a claim that every runtime interaction or external application has been tested. Existing `docs/portfolio-hierarchy.md` records earlier work; its historical test results are not new measurements.

No application source was edited for this audit. Existing `.codex-tmp/` files were already untracked. Environment secrets were not printed or copied. Remote repository README evidence supports documentation-level claims only, not independently reproduced results.

## Existing strengths

- Section order already matches the requested content order: Hero, About, Tech Stack, Featured and Other Projects, GitHub, Experience, conditional Achievements, Certifications, conditional Reviews, Contact and Footer.
- `lib/sections.ts` already drives desktop/mobile navigation and Vee section tracking, including GitHub. Existing anchor IDs and fixed-header scroll padding can be preserved.
- Central typed project data, project filters and incremental reveal controls already exist. Four featured projects and seven secondary projects are present.
- Existing editorial headers, structural rules, scoped dark variables, blue highlight card and responsive project aspect ratios provide the intended visual foundation.
- GitHub uses official GraphQL through a server-only token, validates calendar continuity and totals, has a one-hour process cache and honest unavailable responses. The skyline is dynamically imported near the viewport; it supports canvas keyboard controls, orbit, view switching, statistics and motion preferences.
- Vee's optional model classifies into allowed queries; portfolio replies remain deterministic. Missing model credentials fall back to local knowledge.

## Prioritized findings

### P1 — credibility and reliable behavior

1. **Unsupported project metrics and attribution.** `data/portfolio.ts` claims 94.7% accuracy, 40% faster training, 55% less memory, 100K+ training images and a Lead ML Engineer role. Evaluation artifacts and individual attribution have not been established. ChestAI's public README describes a six-member ensemble effort. Remove unsupported numbers and distinguish documented architecture from measured results and personal responsibilities.
2. **Reviews present unverified submissions as verified.** `app/api/reviews/route.ts` assigns `verified: true` and `featured: true` to arbitrary submissions. It ignores the file-write result and can report success after persistence failure. Local synchronous JSON writes also need an explicit hosting limitation. Optional text fields call `.trim()` without type validation; submitted URLs lack protocol validation. Preserve the feature flag and route while correcting honesty, input bounds and failure handling; no database in Phase 01.
3. **Hero information is gated by an artificial intro.** `Preloader.tsx` uses a 4,500ms animation plus a 500ms settle, locks scrolling, and overlays the entire page; reduced motion still waits. Hero name, summary and CTAs also start hidden with delayed animation. Keep the visual intro available while making essential recruiter information immediately reachable and providing a keyboard-accessible skip.
4. **Contact abuse and provider failures.** `app/api/contact/route.ts` validates fields but has no request-size guard or abuse throttle and sends confirmation emails to user-entered addresses. Provider exceptions are not caught. Add bounded requests, same-origin browser checks, a modest per-process throttle and controlled errors; document deployment-wide limits accurately.
5. **Poth source link is misleading.** Its GitHub field points to the profile rather than an application repository. Do not label that as project source. Request the correct public source or omit that source action while keeping the existing project represented appropriately.

### P2 — requested feature and design gaps

6. **Theme mismatch.** Toolkit is wrapped in `band-dark`; Experience has no dark wrapper; GitHub is fixed black/green. Apply light Tech Stack, scoped dark Experience, and white/green GitHub default with a local black/green toggle. Preserve the royal-blue highlight and existing global tokens. The current blue card is the internship/experience card, not an academic card; keep its placement unless explicitly changed.
7. **GitHub is a rolling calendar without year selection.** The wrapper fetches two calendar years and discards stale metadata. Add explicit year selection, loading/retry states, stale disclosure, selected-year totals and active days, with clearly defined historical versus current streak semantics. A failure fetching either year currently rejects both. Avoid inventing contributions. Renderer sample-data support must never become a production fallback.
8. **Contribution cache is process-local and keyed only by year.** Include username in cache identity; consider Next server caching and bounded stale handling without new infrastructure. Year controls must not cause request races or expose credentials. Never label an old year's final run as today's current streak.
9. **No future case-study metadata.** Existing FeaturedProject and MinorProject interfaces lack typed evidence, contributions, development state and publication readiness. Add shared optional metadata, preserve current fields and omit unknown public fields. No routes or case-study buttons in this phase.
10. **Vee knowledge is incomplete.** Shared navigation already includes GitHub, but scripted intents and API classifier do not offer a dedicated contribution/activity intent. Replies repeat unverified source data and hardcode 2026/remote availability. Derive factual answers from centralized verified data and acknowledge unknown roles, results or deployment health.
11. **Heavy initial route.** This build reports 775 kB first-load JS for `/`, including a 614 kB route. Spline is statically imported through the hero and expensive animated effects run alongside it. Defer the scene and secondary widgets appropriately while preserving their visible behavior. Measure the result rather than promise Lighthouse scores.
12. **Large, eager images.** Featured screenshots already share `aspect-video`, but use plain `img` without lazy loading or responsive optimization. Several previews are approximately 1.1–1.8 MB each; portrait is approximately 2 MB. Preserve real branding, verify screenshots visually, use responsive Next Image sizing and lazy loading below the fold. Certificate thumbnails are also eager.
13. **Modal keyboard focus.** Achievement viewer has Escape and scroll locking but does not trap focus, set initial focus or restore it. Mobile menu also needs an explicit keyboard containment review. Add focus management and check Vee and Reviews dialogs without changing their interactions.
14. **SEO incomplete.** Metadata has no canonical URL, metadataBase or explicit social preview image; there are no sitemap/robots files. Add established public URLs and truthful metadata; do not index future unpublished case studies.
15. **Configuration and documentation drift.** Both next.config.mjs and next.config.ts contain duplicate settings. README still describes Web3Forms although the form uses the Resend API. `ToolsTechnologies.tsx` duplicates tooling content but is not in the homepage. Consolidate configuration and remove unnecessary global devicon CSS only after checking usage; avoid unrelated deletion.
16. **Checks are narrow.** No standalone lint, unit or browser scripts exist. The hierarchy test asserts the current black GitHub theme and source-code patterns rather than year changes, stale/error states or actual browser behavior. Update those assertions when themes change and add focused behavior tests for contribution statistics and API failure paths.

No P0 outage was demonstrated. These priorities describe impact, not a claim of comprehensive WCAG conformance or a penetration test.

## Project accuracy and prioritization

- **ChestAI Diagnostics:** retain first for AI relevance after correcting claims. Public README supports FastAPI, React/Vite, PyTorch, PostgreSQL, Celery/Redis and Docker as documented architecture. It does not establish the homepage's numerical results or personal lead role. Source: https://github.com/vranasinghe/ChestAI_Diagnostics and its main README.
- **CommerceLens:** strongest candidate to promote for Data Science/BI relevance. Public repository contains python, sql, SSIS, Power BI and tests folders. Audit actual implementation and report assets before claiming pipeline completion, business outcomes or individual ownership. Source: https://github.com/vranasinghe/Commerce_Lense.
- **Aura Space:** currently featured; remote reader could not retrieve its repository. Keep priority provisional until source and working flows are verified; this failure is not proof the repository is absent.
- **Bright Future:** keep represented. Public repository describes a six-member second-year team and Spring Boot/React modules. Personal responsibilities remain unknown. Source: https://github.com/vranasinghe/web-voting-system.
- **Poth:** present as Library App; profile-only source and unknown individual/team scope block stronger attribution. Do not silently rename it to a community service or publish a guessed repository.
- **E-Commerce Web System:** present in secondary list and public repository is reachable. Candidate fourth featured slot after validating implemented versus planned Gemini/virtual try-on flows. Do not equate README goals with functioning integration. Source: https://github.com/vranasinghe/E-Commerce-web-system.
- **Real-Time Chat App / Dateza:** present and public repository reachable. Retain secondary placement until chat persistence, deployment and personal scope are established. Source: https://github.com/vranasinghe/Real-Time-Chat-App.
- **AI Chatbot RAG SaaS:** not in current portfolio data. Do not add or publish it based on this brief alone; repository, public release intent and implementation evidence are missing.

Proposed initial featured set: corrected ChestAI, evidence-backed CommerceLens, then Aura Space or E-Commerce according to validation. Use three strong cards if a fourth is not ready. Preserve all existing published projects by moving displaced entries into the filterable secondary list without duplication. Preserve category and Show More behavior.

## Link validation baseline

Web reader retrieved public repository pages for ChestAI, CommerceLens, Bright Future, E-Commerce and Dateza. It failed to retrieve Aura Space (cache miss), LinkedIn and all three Coursera verification URLs (cache misses). It reported the main portfolio and the five probed Vercel demos inaccessible via that tool. These are tool retrieval outcomes, not confirmed HTTP outages; do not mark those demos broken in the UI on this evidence.

The local hierarchy script passed its imageUrl/resumeLink asset-existence checks, including `/Resume.pdf`. This does not verify CV contents or all certificate images. Remaining secondary repository/demo URLs, contact destinations, screenshot authenticity, certificate ownership, authenticated demo workflows and end-to-end deployed backend behavior still require validation. No real YouTube walkthrough URL or authorized demo credentials were supplied. No contact email or review was submitted.

## Executed baseline validation

- `npx tsc --noEmit`: passed.
- Impeccable source detector on homepage, Hero, Toolkit, Experience, Projects and GitHub wrapper: returned no mechanical findings. This does not negate the manually identified content, functionality or accessibility gaps.
- `node scripts/check-hierarchy.mjs`: passed, with Node's typeless-package warning for the imported TypeScript module. This script is currently run outside CI and depends on a Node runtime supporting that import.
- `npm run build`: passed compilation, Next type validation and static generation (11 pages). `/`: 614 kB route, 775 kB first-load JS; shared first-load JS: 103 kB.
- No configured standalone lint, unit, integration or browser test suite was found. Build output saying “Linting” is not evidence of a separately configured ESLint run.
- No new browser interaction, mobile/touch audit, console inspection or Lighthouse measurement was executed in this pre-approval audit. Requested 90/95/95/95 Lighthouse scores remain targets.

## Proposed implementation sequence and acceptance gates

1. **Credibility and typed data:** add optional common project metadata; remove unverified metrics, roles and completion assertions; keep an evidence ledger. Promote only projects with support, preserve existing entries and working links. Gate: type check, no duplicate featured/secondary entries, no empty metadata or nonfunctional actions.
2. **Hierarchy and scoped themes:** preserve existing order/IDs and conditional sections, make Toolkit light and Experience dark, keep the blue highlight, make Other Projects white. Synchronize navigation/Vee references and test active tracking in a fresh browser. Gate: desktop/mobile order, offsets, keyboard navigation and filter/reveal behavior.
3. **GitHub feature completion:** reuse renderer and official route; add selected years, local white/black themes, honest stale/error/configuration states and accessible mobile/keyboard data access. Test dates, leap years, year boundaries, zero activity, token absence, rate limiting and races. Gate: real data only; no token in client output; correct scope labels and statistics.
4. **Recruiter access and hardening:** make essential hero content immediately accessible, preserve animations with skip/reduced-motion behavior; improve responsive media; fix modal focus and API validation/failure handling. Gate: contact validation without sending mail, reviews disabled/enabled behavior and truthful verification labels, Vee unknown-answer behavior.
5. **SEO, performance and documentation:** canonical/social metadata, sitemap/robots, consolidate config, document provider requirements and hosting limits, update README and checks. Gate: production build, measured bundle comparison, browser regression at desktop/tablet/mobile, Lighthouse where available, and final evidence/link report.

Expected source ownership: data/portfolio.ts; components/Projects.tsx, Toolkit.tsx, Experience.tsx, Hero.tsx, Preloader.tsx, Achievements.tsx and relevant dialogs; components/github/*; app/api/github-activity/route.ts, contact/route.ts and reviews/route.ts; lib/githubActivity.ts and veeBrain.ts; app/layout.tsx plus sitemap/robots; config, env example, README and focused scripts. Keep changes incremental and inspect diffs between gates.

No new dependencies are planned. No case-study routes, CMS, database, commits, pushes or production deployment are included. Any missing evidence remains absent from public cards and is recorded as a blocker rather than fabricated.

## Assessment rubric

Provisional source-review ratings use 0 = absent/unreliable, 1 = major gaps, 2 = partial, 3 = good with bounded gaps, 4 = demonstrated and verified. They are engineering judgments, not Lighthouse scores.

- Content credibility: 1/4 — unsupported metrics, roles and automatic review verification.
- Recruiter hierarchy/access: 3/4 — correct order and CTAs; intro delays access.
- Functional completeness: 2/4 — core interactions exist; GitHub controls and honest persistence need work.
- Accessibility: 2/4 provisional — labels, focus styles and canvas keyboard handling exist; modal focus and motion need attention; rendered contrast unmeasured.
- Performance: 1/4 — 775 kB initial JS and large eager media.
- Theming: 2/4 — established tokens, three requested section themes incomplete.
- Responsive behavior: unscored pending rendered and touch checks.
- Implementation integrity: 2/4 — coherent incumbent architecture; duplicated config, narrow checks and evidence gaps.

Assessment: strong visual and architectural foundation, but credibility and recruiter access should precede additional decorative work. Final ratings must be reassessed against executed post-change checks.
