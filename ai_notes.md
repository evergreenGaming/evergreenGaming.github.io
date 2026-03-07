
# AI Notes for evergreenGaming.github.io

## Quick Post Workflow (Use This First)

1. Classify task scope: `new post`, `edit existing post`, or `series/follow-up`.
2. Keep canonical structure: load `../tags-config.js` + `../post-helper.js`, and keep the standard post shell (`post-content`, `post-header`, `post-meta`, `back-link`, footer).
3. Enforce series consistency when applicable:
   - Use canonical series markup only: `<p class="series-nav"><a class="series-bubble" ...>...</a></p>`.
   - Add explicit metadata label: `<span class="post-tag">Part X of Y</span>`.
   - Require bidirectional links before done (`previous -> next` and `next -> previous`).
4. If this is a new post, update all publish surfaces: `tags-config.js`, `index.html`, and `feed.xml` (new top entry + root `<updated>`).
5. Run the Pre-Publish QA checklist in this file.
6. Treat any missing required linkage/feed update as a blocking defect.

## Implementation Consistency Rules

- Reuse shared classes from `style.css` (do not redefine canonical `series-nav` / `series-bubble` styling per post unless explicitly requested).
- Keep series navigation position consistent: directly below the topic/project/tag metadata block.
- Keep naming consistent: `Next: Part N ->` and `<- Part N` text pattern.
- Preserve existing site shell and footer structure across posts.

## Centralized Tag System (CRITICAL)

**The blog uses a centralized tag configuration system to ensure consistency across all pages.**

### Core Configuration Files

1. **`tags-config.js`** - Central source of truth
   - Defines all tag labels with emojis (`TAG_LABELS`)
   - Defines all topic/project labels with emojis (`TOPIC_PROJECT_LABELS`)
   - Contains metadata for all posts (`POSTS` object)
   - Provides utility functions for rendering tags

2. **`post-helper.js`** - Automatic tag rendering for post pages
   - Automatically loads post metadata from `tags-config.js`
   - Dynamically renders tags, topics, and projects
   - Works with data attributes: `data-post-tags`, `data-post-topic`, `data-post-project`

### How the Tag System Works

#### For index.html
- Includes: `<script src="tags-config.js"></script>`
- The main script uses `BLOG_CONFIG.TAG_LABELS` and `BLOG_CONFIG.TOPIC_PROJECT_LABELS`
- Tags are dynamically rendered with clickable links
- Cross-filter validation: selecting a topic/tag disables incompatible options in the other filter

#### For Individual Post Pages
1. Include both scripts in `<head>`:
   ```html
   <script src="../tags-config.js"></script>
   <script src="../post-helper.js"></script>
   ```

2. Use data attributes for automatic tag rendering:
   ```html
   <p>
     <span data-post-topic></span>
     <span data-post-project></span><br/>
     <span data-post-tags></span>
   </p>
   ```

3. The system automatically detects post slug, looks up metadata, and renders tags

### Adding a New Post (MANDATORY STEPS)

**PUBLISHING CONTRACT (NON-NEGOTIABLE):** A new post is not considered published until `feed.xml` is updated (new `<entry>` at top + main `<updated>` timestamp).

1. **Update `tags-config.js`** - Add entry to `POSTS` object:
   ```javascript
   "my-new-post": {
     topic: "experiments",
     project: "my-project",
     tags: ["tools", "web", "workflow"]
   }
   ```

2. **Create HTML file** in `/posts/` using data attributes (see template below)

3. **Update `index.html`** - Add post card with matching `data-` attributes:
   ```html
   <article class="post-card" 
            data-project="my-project" 
            data-project-label="My Project"
            data-tags="tools,web,workflow" 
            data-topic="experiments" 
            data-topic-label="🛠️ Experiments">
   ```

4. **Update `feed.xml`** - Add new entry at the TOP of the feed (newest first):
   ```xml
   <entry>
     <title>My New Post Title</title>
     <link href="https://evergreengaming.github.io/posts/my-new-post.html" rel="alternate" type="text/html"/>
     <id>https://evergreengaming.github.io/posts/my-new-post.html</id>
     <published>2026-02-XX T00:00:00Z</published>
     <updated>2026-02-XX T00:00:00Z</updated>
     <summary>Post description/excerpt here</summary>
     <category term="tag1"/>
     <category term="tag2"/>
   </entry>
   ```
   
   **CRITICAL:** Also update the main `<updated>` timestamp at the top of feed.xml to match the new post date.
   
   **Purpose:** RSS feed is monitored by Follow.it for email subscriptions. When the feed updates, subscribers automatically get notified of new posts.

### Adding New Tags or Topics

**For a new tag**: Add to `TAG_LABELS` in `tags-config.js`:
```javascript
TAG_LABELS: {
  "my-new-tag": "🎯 my-new-tag",
  // ...
}
```

**For a new topic/project**: Add to `TOPIC_PROJECT_LABELS` in `tags-config.js`:
```javascript
TOPIC_PROJECT_LABELS: {
  "my-new-topic": "🚀 My New Topic",
  // ...
}
```

---

# Strict Publishing Rules

- **Always use in-page lightbox popup (not new-tab links) for image enlarge in blog posts.**
	- Required canonical pattern = same behavior/style as `evergreenGaming.github.io/posts/stocktool-experiment.html`:
		- CSS classes: `.lightbox-overlay`, `.lightbox-overlay.is-open`, `.lightbox-img`
		- JS behavior: create overlay once, open on image click, close on overlay click, close on `Escape`, lock body scroll while open
		- UX hint: add text near images like "Click image to enlarge ↗"
	- Do **not** use `<a target="_blank">` as the default enlarge behavior unless explicitly requested.
	- Keep this implementation visually and behaviorally consistent across all posts (same fashion every time).

- **Publishing contract when adding a new post (must be fully satisfied): update `tags-config.js`, `index.html`, AND `feed.xml`.**
	- Add post metadata to `POSTS` object in `tags-config.js` (topic, project, tags)
	- Add post card to Recent Posts in `index.html` with matching `data-` attributes
	- Add RSS entry to `feed.xml` at the TOP (newest first) with updated timestamp
	- Verify sort/date placement is correct for newest-first display
  - Treat missing `feed.xml` update as a publishing-blocker defect (must fix before done)

- **Tag integrity rule** when post metadata changes:
	- All tags, topics, and projects MUST be defined in `tags-config.js`
	- Never hardcode tags in HTML - always use data attributes
	- If new tags are introduced, add to `TAG_LABELS` in `tags-config.js`
	- If new topics/projects are introduced, add to `TOPIC_PROJECT_LABELS` in `tags-config.js`
	- Refactor/remove obsolete tags to avoid duplicates/inconsistencies

- **Multipart post rule** (Part 1/Part 2/etc.)
  - Use the canonical series navigation bubble near the top metadata block:
    - Part 1: `<p class="series-nav"><a class="series-bubble" href="part2-file.html">Next: Part 2 →</a></p>`
    - Part 2+: `<p class="series-nav"><a class="series-bubble" href="part1-file.html">← Part 1</a></p>` (or previous/next as applicable)
  - Always add explicit part label in metadata line using post tag style:
    - Example: `<span class="post-tag">Part 1 of 2</span>` / `<span class="post-tag">Part 2 of 2</span>`
  - Navigation must be reciprocal: every linked part must link back (two-way chain for all parts).
  - Follow the same pattern used in existing series posts (Promptomat and Asset Viewer) for consistency.


- **Follow-up linkage rule (hard blocker)**
  - Any post that says it is a "follow-up", "part", "continuation", or directly references a prior post as predecessor MUST include explicit top-of-article series navigation.
  - Linkage is mandatory in both directions before publish: previous -> next and next -> previous.
  - Missing bidirectional linkage is a publishing-blocker defect and must be fixed before completion.
## Pre-Publish QA Checklist (Mandatory)

- ✅ Publishing blocker check: if a new post was added, `feed.xml` MUST be updated before completion
- ✅ Verify each new post image opens in lightbox popup and closes via overlay click + `Escape`
- ✅ Verify no image in new/edited post uses new-tab enlarge pattern by mistake
- ✅ Verify `tags-config.js` has entry in `POSTS` object for the new post
- ✅ Verify `index.html` post card has matching `data-` attributes
- ✅ Verify `feed.xml` has new entry at the TOP with correct title, link, date, summary, and categories
- ✅ Verify `feed.xml` main `<updated>` timestamp matches the new post date
- ✅ Verify new tags/topics are defined in `TAG_LABELS` or `TOPIC_PROJECT_LABELS`
- ✅ Verify post page includes both `tags-config.js` and `post-helper.js`
- ✅ Verify post uses data attributes (`data-post-tags`, `data-post-topic`, `data-post-project`)
- ✅ If multipart: verify top `series-nav` bubble exists with correct target(s)
- ✅ If multipart: verify reciprocal navigation (Part 1 ↔ Part 2, or full previous/next chain)
- [ ] If post is a follow-up/continuation: verify explicit top `series-nav` exists and links are bidirectional (prev <-> next)

---

## Post Page Template (AI-Ready)

### Required `<head>` structure:
```html
<head>
<meta charset="utf-8"/>
<meta content="width=device-width,initial-scale=1" name="viewport"/>
<title>Post Title - Evergreen Gaming</title>
<link href="../style.css" rel="stylesheet"/>
<script src="../tags-config.js"></script>
<script src="../post-helper.js"></script>
<style>
  .post-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
  }
  .post-header {
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  /* ... standard post styles ... */
</style>
</head>
```

### Required `<body>` structure:
```html
<body>
<div class="post-content">
<a class="back-link" href="../index.html">← Back to home</a>
<header class="post-header">
<div class="post-meta">
<time datetime="YYYY-MM-DD">Month Day, Year</time>
</div>
<h1>Post Title</h1>
</header>
<article>
<p>
  <span data-post-topic></span>
  <span data-post-project></span><br/>
  <span data-post-tags></span>
</p>

<!-- If series/follow-up, use canonical series bubble -->
<p class="series-nav">
  <a class="series-bubble" href="other-part.html">Next: Part 2 -></a>
</p>

<!-- Post content here -->

</article>
<a class="back-link" href="../index.html">← Back to home</a>
</div>
<footer class="site-footer">
<div class="container">
<p>
<a href="../index.html">Home</a> • 
<a href="https://github.com/evergreenGaming">GitHub</a> • 
<a href="https://github.com/evergreenGaming/AIhelpers">AI Helpers</a>
</p>
<p style="margin-top: 16px; font-size: 0.85rem;">
<strong>Impressum</strong><br/>
Moritz Meyers • <a href="https://github.com/evergreenGaming">Contact via GitHub</a>
</p>
</div>
</footer>
</body>
```

---

## Current Available Tags/Topics/Projects

**Refer to `tags-config.js` for the authoritative list.**

Current topics: meta, experiments, gaming, welcome, tools  
Current projects: ai-experiment, modeleditor, stocktool, asset-viewer, promptomat  
Current tags: gaming, tools, art, meta, web, ui, workflow, graphics, finance, devlog, product, timeline, tech-art, portfolio, communication, frustration

**IMPORTANT:** Only "gaming" tag is used exclusively for asset-viewer posts. Do not add "gaming" tag to other posts unless explicitly requested.

---

## Filter System Behavior

- Topics dropdown shows both topics AND projects (unified)
- Tags dropdown shows only tags
- Selecting a topic/project filters tags to show only compatible options (cross-filter validation)
- Selecting a tag filters topics/projects to show only compatible options
- Tags on post cards are clickable and trigger the tag filter
- Right-click on any dropdown resets it to "All"

---

## Key Architecture Notes

- **No frameworks** - vanilla JS, CSS, and HTML only
- **Centralized config** prevents tag inconsistencies across pages
- **Dynamic rendering** means tags update automatically when config changes
- **Consistent styling** across all posts via shared `style.css`
- **Accessibility** - proper ARIA labels, keyboard navigation, semantic HTML

---

## RSS Feed & Email Subscription System

### Overview
The blog uses an RSS/Atom feed (`feed.xml`) monitored by Follow.it to automatically notify email subscribers when new posts are published.

### Files Involved
- **`feed.xml`** - RSS/Atom feed listing all blog posts
- **`index.html`** - Contains Follow.it verification meta tag and subscription widget
- **Follow.it widget** - Embedded form in subscription section (bottom of page)

### How It Works
1. User subscribes via the Follow.it form (bottom of `index.html` or via Subscribe button in filter bar)
2. Follow.it monitors `https://evergreengaming.github.io/feed.xml` for changes
3. When `feed.xml` is updated with a new post entry, Follow.it detects the change
4. Follow.it automatically sends email notifications to all subscribers

### RSS Feed Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Evergreen Gaming Dev Blog</title>
  <link href="https://evergreengaming.github.io/" rel="alternate" type="text/html"/>
  <link href="https://evergreengaming.github.io/feed.xml" rel="self" type="application/atom+xml"/>
  <updated>YYYY-MM-DDTHH:MM:SSZ</updated> <!-- Update this when adding new posts -->
  <id>https://evergreengaming.github.io/</id>
  <subtitle>...</subtitle>
  <author>...</author>

  <!-- New entries go at the TOP -->
  <entry>
    <title>Post Title</title>
    <link href="https://evergreengaming.github.io/posts/post-slug.html" rel="alternate" type="text/html"/>
    <id>https://evergreengaming.github.io/posts/post-slug.html</id>
    <published>YYYY-MM-DDTHH:MM:SSZ</published>
    <updated>YYYY-MM-DDTHH:MM:SSZ</updated>
    <summary>Post excerpt/description</summary>
    <category term="tag1"/>
    <category term="tag2"/>
  </entry>
  
  <!-- Older entries below... -->
</feed>
```

### Important Notes
- **Always add new entries at the TOP** of the feed (newest first)
- **Always update the main `<updated>` timestamp** when adding a new post
- **Use ISO 8601 format** for dates: `YYYY-MM-DDTHH:MM:SSZ` (e.g., `2026-02-25T00:00:00Z`)
- **Keep summaries concise** - ideally match the `post-excerpt` from `index.html`
- **Add all relevant tags** as `<category>` elements
- The feed is linked in `index.html` head: `<link href="feed.xml" rel="alternate" ... />`

### Follow.it Configuration
- **Verification meta tag** in `index.html`: `<meta name="follow.it-verification-code" content="BaCvNJLLTGYEsKcyZhLh"/>`
- **Feed URL**: `https://evergreengaming.github.io/feed.xml`
- **Widget location**: Bottom of page in `subscription-section` before footer
- **Subscribe button**: In filter bar, scrolls to subscription section

---

