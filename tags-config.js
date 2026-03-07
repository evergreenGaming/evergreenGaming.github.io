// Centralized tag and topic/project configuration for Evergreen Gaming Blog
// This ensures consistency across all pages

const BLOG_CONFIG = {
  // Tag definitions with emojis
  TAG_LABELS: {
    gaming: "🎮 gaming",
    tools: "🧰 tools",
    art: "🎨 art",
    meta: "🧠 meta",
    web: "🌐 web",
    ui: "🧩 ui",
    workflow: "⚙️ workflow",
    graphics: "🖥️ graphics",
    finance: "📈 finance",
    devlog: "📝 devlog",
    product: "🧭 product",
    timeline: "📈 timeline",
    "tech-art": "🎨 tech-art",
    portfolio: "🗂️ portfolio",
    communication: "🗨️ communication",
    frustration: "😤 frustration"
  },

  // Unified labels for topics AND projects (both appear in Topics dropdown)
  TOPIC_PROJECT_LABELS: {
    // Topics
    "meta": "🧠 Meta",
    "experiments": "🛠️ Experiments",
    "gaming": "🎮 Gaming",
    "welcome": "👋 Welcome",
    "tools": "🧰 Tools",
    // Projects
    "asset-viewer": "📁 Asset Viewer",
    "stocktool": "📈 StockTool",
    "modeleditor": "🖥️ ModelEditor",
    "promptomat": "🧰 Promptomat",
    "ai-experiment": "🧪 AI-Experiment",
    "flyinggame": "✈️ FlyingGame"
  },

  // Post metadata - central source of truth for all posts
  POSTS: {
    "flyinggame-12h-sprint-report": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "devlog", "workflow", "meta"]
    },
    "flyinggame-multiplayer-combat-breakthrough": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "devlog", "workflow", "meta"]
    },
    "flyinggame-contract-driven-execution": {
      topic: "gaming",
      project: "flyinggame",
      tags: ["gaming", "workflow", "devlog", "meta"]
    },
    "codex-session-workflow": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "workflow", "tools", "web"]
    },
    "ai-to-the-rescue": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "communication", "workflow", "frustration"]
    },
    "portfolio-journey": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "web", "tools", "product", "timeline", "tech-art", "portfolio"]
    },
    "modeleditor-webgl-experiment": {
      topic: "experiments",
      project: "modeleditor",
      tags: ["graphics", "web", "tools"]
    },
    "blogging-with-ai": {
      topic: "meta",
      project: "ai-experiment",
      tags: ["meta", "workflow"]
    },
    "stocktool-experiment": {
      topic: "experiments",
      project: "stocktool",
      tags: ["finance", "ui", "tools"]
    },
    "stocktool-part2": {
      topic: "experiments",
      project: "stocktool",
      tags: ["finance", "ui", "tools", "workflow"]
    },
    "assetviewer-part1": {
      topic: "gaming",
      project: "asset-viewer",
      tags: ["tools", "graphics", "workflow", "gaming"]
    },
    "assetviewer-part2": {
      topic: "gaming",
      project: "asset-viewer",
      tags: ["tools", "graphics", "workflow", "gaming"]
    },
    "promptomat-creation": {
      topic: "welcome",
      project: "promptomat",
      tags: ["meta", "workflow", "tools"]
    },
    "promptomat-evolution": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "product"]
    },
    "promptomat-growth-engine": {
      topic: "meta",
      project: "promptomat",
      tags: ["meta", "workflow", "tools", "ui", "product"]
    }
  },

  /**
   * Render tags as text with emojis
   * @param {string[]} tags - Array of tag keys
   * @returns {string} Formatted tag string
   */
  renderTagsText(tags) {
    return tags.map(tag => this.TAG_LABELS[tag] || tag).join(" • ");
  },

  /**
   * Render tags as clickable elements (for index page)
   * @param {HTMLElement} container - Container element
   * @param {string[]} tags - Array of tag keys
   * @param {Function} onTagClick - Callback when tag is clicked
   */
  renderTagsClickable(container, tags, onTagClick) {
    container.innerHTML = "";
    tags.forEach((tag, idx) => {
      if (idx > 0) {
        container.appendChild(document.createTextNode(" • "));
      }
      
      const tagLabel = this.TAG_LABELS[tag] || tag;
      const tagLink = document.createElement("span");
      tagLink.className = "tag-link";
      tagLink.textContent = tagLabel;
      tagLink.style.cursor = "pointer";
      tagLink.title = `Filter by ${tagLabel}`;
      
      tagLink.addEventListener("click", (e) => {
        e.preventDefault();
        onTagClick(tag);
      });
      
      container.appendChild(tagLink);
    });
  },

  /**
   * Get post metadata by slug
   * @param {string} slug - Post slug (filename without .html)
   * @returns {Object|null} Post metadata or null
   */
  getPostMeta(slug) {
    return this.POSTS[slug] || null;
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.BLOG_CONFIG = BLOG_CONFIG;
}
