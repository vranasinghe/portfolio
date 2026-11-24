# Future project case study implementation plan

Status: planning only, 2026-11-25. No dedicated project routes are authorized for Phase 01.

Phase 01 update: optional shared project metadata is implemented in data/portfolio.ts. No detail routes or case-study actions were added. See PHASE_01_IMPLEMENTATION.md for the current evidence blockers and PHASE_01_LINK_CHECKS.json for actual link results; CommerceLens source access and two secondary deployments currently block stronger publication claims.

## Initial candidates

Start with ChestAI Diagnostics and CommerceLens after evidence review. Consider Aura Space or E-Commerce as the third case study after verifying live flows and ownership. Keep Bright Future and Poth represented in existing project lists; their individual contribution evidence needs clarification. Do not publish AI Chatbot RAG SaaS without an identified public project and release approval.

## Recommended narrative

1. Project name, concise summary, public repository and working demo.
2. Problem, intended users and project constraints.
3. Team/individual context, personal role and specific contributions.
4. Implemented solution and annotated system architecture.
5. Technical decisions, alternatives and tradeoffs.
6. Actual screenshots or a real walkthrough.
7. Evaluation methodology and verified results, where available.
8. Challenges, limitations and future improvements.

Keep goals and planned features distinct from implemented behavior. Report measurements only with datasets, splits, evaluation procedure and source artifacts. Medical project descriptions must accurately frame the demonstrated research application without implying established clinical validation.

## Data reuse and Phase 01 preparation

Reuse title, description, longDescription, imageUrl, tags, github, live and existing role fields after fact checking. Both existing project interfaces should optionally share metadata for slug, projectType, developmentStatus, role, personalContributions, problemStatement, solutionSummary, technicalHighlights, architectureImage, screenshots, demoVideo, verifiedMetrics, evidence, challenges, limitations, futureImprovements and caseStudyStatus (`draft` or `published`). Unknown values remain absent; never infer team ownership or completion from a title. Existing objects remain compatible without requiring any new fields.

Evidence references should identify source URL/path, what the source supports and verification date. Metrics should carry value/unit, method, dataset or environment, and an evidence reference. Screenshot entries should include src, alt and optional caption. Optional metadata alone must not create a public button or indexable page.

## Required missing evidence

- ChestAI: exact personal contribution and team role; implemented model architecture; dataset provenance and split; reproducible evaluation scripts/reports; limitations; removal or proof of existing 94.7%, 40% and 55% claims.
- CommerceLens: actual pipeline execution evidence; schema and source dataset; authored components; report exports and tests; deployment status if any.
- Aura Space/E-Commerce: implemented auth/data flows; backend configuration; real screenshots; personal contribution; whether AI integrations run or are planned.
- Poth: correct repository; public release intent; individual/team context; verified feature scope.
- All projects: owner-confirmed status, permissions for screenshots, stable source references and a demo health check. No credentials belong in portfolio data.

## Screenshots and diagrams

Capture the actual application with non-sensitive sample data: overview, one core workflow, and one technically significant result. ChestAI needs upload/result and architecture views; CommerceLens needs ETL lineage, dimensional model and Power BI report views. Supply readable alt text and captions, consistent responsive aspect ratios, optimized files and no private records. Diagrams must describe implemented architecture rather than aspirations.

## Proposed future architecture

In a later approved phase, use App Router `app/projects/[slug]/page.tsx`, `generateStaticParams` restricted to published entries, per-project metadata and `notFound()` for drafts/unknown slugs. Reuse centralized typed content; a CMS or database is unnecessary initially. Add published project URLs to sitemap only at release. Provide back navigation to `/#projects` and maintain homepage filtering independently.

Possible reusable components: ProjectOverview, ContributionSummary, ArchitectureFigure, ScreenshotGallery, TechnicalDecisions, VerifiedResults, Limitations and ProjectLinks. Render sections only when evidence-backed content exists. Keep links functional with or without a live demo.

## Milestones and complexity

1. Evidence collection and ownership confirmation: medium effort; external information is the largest uncertainty.
2. Typed data/schema and publication gating: small to medium effort, prepared incrementally in Phase 01.
3. Shared detail layout and static routing: medium effort in a future phase.
4. First two narratives and media: medium to large effort depending on evidence and screenshot readiness.
5. Accessibility, responsive media, SEO and release checks: medium effort.

Overall future implementation is medium complexity once evidence exists. Avoid calendar estimates until repository scope and artifact readiness are established.

## Future acceptance tests

- Published slugs resolve; drafts and unknown slugs return 404 and stay out of sitemap.
- No empty fields, invented metrics or unpublished project leaks.
- Repository, demo and walkthrough destinations are accurate and keyboard accessible.
- Galleries have meaningful alt text, responsive sizing, focus restoration and reduced-motion behavior.
- Metadata/canonical/social images match each published project.
- Production build/type checks pass; homepage project filters and reveal controls remain intact.
- Recheck actual performance, mobile layout and accessibility before publication.
