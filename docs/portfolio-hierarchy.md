# Portfolio hierarchy update

## Existing architecture and findings

The site uses Next.js 15 App Router, React 19, Tailwind, Framer Motion, and a lazy canvas GitHub visualization backed by a server-only GraphQL route. Content lives in data/portfolio.ts. app/page.tsx composes existing sections; lib/sections.ts drives desktop/mobile navigation and the Vee guide. Global mixed black/blue/white tokens are scoped by band-dark. The deployed URL could not be retrieved by the web reader during this review.

Current order is Hero, About, Projects, Tech Stack, GitHub, Experience, Achievements, Certifications, optional Reviews, Contact. GitHub is missing from the shared section registry. Navigation chooses the nearest section boundary, which can activate a future section before the visitor reaches it. Tech Stack uses 88/120px vertical padding plus a large header gap. The AI project already leads Featured Projects; the secondary list can prioritize AI, Data, and full-stack engineering without removing entries.

## Implementation plan (recorded before source changes)

1. Move the existing skills section before projects. Keep home, about, skills, projects, github-activity, experience, achievements, certifications, and contact IDs to preserve existing deep links. Keep optional Reviews behavior intact.
2. Reorder the shared navigation registry to match and add GitHub. Reuse the registry for Vee tracking. Give desktop/mobile active links equivalent accessible state. Track the section at a consistent reading line rather than the nearest boundary.
3. Keep all Tech Stack categories, icons, hover/entrance animations, and responsive grids. Lead with AI & Data, reduce vertical spacing, and use a compact variant of the existing section header. Keep direct project navigation and the hero project CTA.
4. Keep every featured project and its links, leading with X-ray Diagnostic AI. Prioritize AI/ML, Data/BI, and full-stack engineering in the secondary project list. Preserve filtering and Load more.
5. Scope a black/green theme to GitHub Activity, including canvas palette, labels, controls, focus rings, loading/error states, and selection. Preserve the existing renderer, real data, and 2D/3D interactions. Align section width/spacing with the portfolio.
6. Preserve achievement visibility, certifications, contact form, metadata, and all backend routes. Update section headings where the requested hierarchy clarifies their role.

## Validation plan

Run TypeScript and production build; assert section/nav order, unique IDs, local asset targets, content retention, and no broken internal destinations. Inspect desktop, tablet, and phone layouts, navigation active states, Tech Stack categories, project filtering, GitHub mode toggle, and contact inputs. Check accessible names/focus/contrast on changed surfaces. Do not submit contact messages or deploy. Record actual outcomes and any unavailable checks below after execution.

## Executed validation

- `npx tsc --noEmit`: passed after the edits.
- `node scripts/check-hierarchy.mjs`: passed. Checks section/nav order, unique destinations, GitHub placement, reading-line edge cases, desktop/mobile accessible current states, project control retention, local portfolio assets, and scoped theme.
- `npm run build`: passed, including Next.js type/lint checks and static generation. Home first-load JavaScript remains about 775 kB; no dependency was added.
- Impeccable mechanical detector on changed UI targets: returned no findings.
- Browser responsive checks at 1440 x 1000, 768 x 1024, and 390 x 844: no horizontal document overflow. Tech Stack measured approximately 405px, 569px, and 546px tall respectively.
- Browser checked the new mobile menu order and GitHub destination; menu closed after selection and the URL hash updated. Existing IDs and Hero project CTA are retained.
- Browser checked skill category switching, the Fullstack project filter, Load more revealing six secondary projects, the NASA certificate dialog opening/closing, and the GitHub 2D/3D control and accessible canvas name. A seventh secondary project remains available through the next Load more increment.
- Accessibility spot checks: no unnamed links; all three contact fields retain their names and required attributes; desktop/mobile nav links expose aria-current; focus targets, reduced-motion navigation, heading hierarchy, and dark-surface text/control tokens reviewed.
- Active tracking pure tests passed. A stale highlight was observed during live canvas/smooth-scroll layout changes; the implementation now reconciles scroll-end, section resize, and late layout changes. The hot-reloaded browser preview did not reliably settle on the final highlight, so final active tracking should be rechecked in a fresh page load.

## Scope and remaining verification

No content records, repository/live-project URLs, credentials, API behavior, SEO metadata, contact submission logic, feature flags, or global theme tokens were changed. Existing optional Reviews remains between Certifications and Contact when enabled. Achievements retains its data-based visibility rule.

External link destinations were preserved rather than all remote services being probed. No contact message was sent, no email delivery was tested, and no automated full-site accessibility audit was available; accessibility checks above are targeted manual/structural checks. The deployed site was inaccessible to the web reader. No push or deployment was performed.
