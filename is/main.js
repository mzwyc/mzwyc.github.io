document.addEventListener('DOMContentLoaded', function() {
  // 搜索功能
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput && searchResults) {
    // 模拟的搜索数据 - 在实际Jekyll站点中，这应该来自搜索索引或API
    const posts = [
      {
        title: "Welcome to My Blog!",
        url: "/2023/01/01/welcome-to-my-blog/",
        excerpt: "I'm excited to start this blog and share my thoughts on web development, design, and technology.",
        categories: ["introduction", "blogging"]
      },
      {
        title: "Mastering Modern JavaScript: ES6 and Beyond",
        url: "/2023/01/15/learning-javascript/",
        excerpt: "JavaScript has come a long way since its inception in 1995. With the introduction of ES6...",
        categories: ["javascript", "webdev"]
      },
      {
        title: "Mastering CSS Grid: Creating Modern Web Layouts",
        url: "/2023/02/10/css-grid-layouts/",
        excerpt: "CSS Grid Layout is a powerful 2-dimensional layout system that has revolutionized how we create web layouts.",
        categories: ["css", "webdesign"]
      }
    ];

    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      if (searchTerm.length === 0) {
        searchResults.style.display = 'none';
        return;
      }

      const results = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.categories.some(category => category.toLowerCase().includes(searchTerm))
      );

      displaySearchResults(results);
    });

    // 点击页面其他地方时隐藏搜索结果
    document.addEventListener('click', function(e) {
      if (e.target !== searchInput) {
        searchResults.style.display = 'none';
      }
    });

    // 防止点击搜索结果时隐藏
    searchResults.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    function displaySearchResults(results) {
      if (results.length === 0) {
        searchResults.innerHTML = '<li>No results found</li>';
      } else {
        searchResults.innerHTML = results.map(post => `
          <li>
            <a href="${post.url}">${post.title}</a>
            <p>${post.excerpt}</p>
          </li>
        `).join('');
      }
      searchResults.style.display = 'block';
    }
  }

  // 移动端菜单切换
  const navTrigger = document.querySelector('.nav-trigger');
  if (navTrigger) {
    navTrigger.addEventListener('click', function() {
      const siteNav = document.querySelector('.site-nav');
      if (siteNav) {
        siteNav.classList.toggle('expanded');
      }
    });
  }

  // 代码高亮 - 如果使用Prism.js或Highlight.js
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  // 图片灯箱效果
  document.querySelectorAll('.post-content img').forEach(img => {
    img.parentElement.style.cursor = 'zoom-in';
    
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '1000';
      overlay.style.cursor = 'zoom-out';
      
      const clonedImg = img.cloneNode(true);
      clonedImg.style.maxWidth = '90%';
      clonedImg.style.maxHeight = '90%';
      clonedImg.style.width = 'auto';
      clonedImg.style.height = 'auto';
      
      overlay.appendChild(clonedImg);
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
    });
  });
});
