# AGENTS.md

## Scope
These rules apply to the whole repository.

## Required References
- Read `ai_notes.md` before creating or editing blog posts.
- Treat `ai_notes.md` as the source of truth for publishing workflow and QA checks.

## Non-Negotiable Series Rule
- If a post is a follow-up, part of a series, continuation, or references another post as predecessor:
  - Add explicit top-of-article `series-nav` links.
  - Use canonical series bubble markup only: `<p class="series-nav"><a class="series-bubble" ...>...</a></p>`.
  - Add part label metadata: `<span class="post-tag">Part X of Y</span>`.
  - Enforce bidirectional linkage before completion: previous -> next and next -> previous.
  - Consider missing bidirectional links a publishing blocker.

## Done Criteria for Post Updates
- No post task is complete until required cross-links are present and reciprocal.

## Execution Flow (Concise)
1. Follow `ai_notes.md` "Quick Post Workflow (Use This First)".
2. Reuse canonical post/series classes from `style.css`; avoid one-off style variants for shared patterns.
3. For new posts, treat `tags-config.js` + `index.html` + `feed.xml` updates as mandatory.
