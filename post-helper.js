// Helper script for individual blog post pages
// Automatically renders tags and metadata from centralized configuration

(function() {
  'use strict';

  // Wait for DOM and BLOG_CONFIG to be ready
  function initPostPage() {
    if (typeof BLOG_CONFIG === 'undefined') {
      console.error('BLOG_CONFIG not loaded. Make sure tags-config.js is included before post-helper.js');
      return;
    }

    // Get post slug from current page
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const slug = filename.replace('.html', '');

    // Get post metadata
    const postMeta = BLOG_CONFIG.getPostMeta(slug);
    if (!postMeta) {
      console.warn(`No metadata found for post: ${slug}`);
      return;
    }

    // Find and update tag display elements
    const tagContainers = document.querySelectorAll('[data-post-tags]');
    tagContainers.forEach(container => {
      const tagsText = BLOG_CONFIG.renderTagsText(postMeta.tags);
      container.innerHTML = tagsText;
    });

    // Find and update topic display elements
    const topicContainers = document.querySelectorAll('[data-post-topic]');
    topicContainers.forEach(container => {
      const topicLabel = BLOG_CONFIG.TOPIC_PROJECT_LABELS[postMeta.topic] || postMeta.topic;
      container.innerHTML = `<strong>${topicLabel}</strong>`;
    });

    // Find and update project display elements
    const projectContainers = document.querySelectorAll('[data-post-project]');
    projectContainers.forEach(container => {
      const projectLabel = BLOG_CONFIG.TOPIC_PROJECT_LABELS[postMeta.project] || postMeta.project;
      container.innerHTML = `<span class="post-tag">${projectLabel}</span>`;
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostPage);
  } else {
    initPostPage();
  }
})();
