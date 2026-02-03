const API_BASE = 'data';

// ============================================
// 1. Mouse Tracking for Ambient Light Effect
// ============================================
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.post-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ============================================
// 2. Skeleton Loading System
// ============================================
function createSkeletonCard() {
  return `
    <article class="post-card skeleton-card">
      <div class="post-image skeleton skeleton-image"></div>
      <div class="post-content">
        <div class="post-meta">
          <div class="skeleton skeleton-avatar"></div>
          <div class="skeleton skeleton-text" style="width: 40%;"></div>
        </div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 70%;"></div>
        <div class="skeleton" style="width: 120px; height: 40px; border-radius: 4px;"></div>
      </div>
    </article>
  `;
}

async function loadPosts() {
  const container = document.getElementById('posts-container');
  if (!container) return [];
  
  // Show skeleton loading state
  const skeletonCount = 6;
  container.innerHTML = Array(skeletonCount).fill(createSkeletonCard()).join('');
  
  try {
    const response = await fetch(`${API_BASE}/posts.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

async function savePost(post) {
  try {
    const response = await fetch(`${API_BASE}/posts.json`);
    const data = await response.json();
    data.posts.push(post);
    const newResponse = await fetch(`${API_BASE}/posts.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
    });
    return await newResponse.json();
  } catch (error) {
    console.error('Error saving post:', error);
    return null;
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

if (document.getElementById('posts-container')) {
  loadPosts().then(data => {
    const container = document.getElementById('posts-container');
    if (data.posts && data.posts.length > 0) {
      container.innerHTML = data.posts.map((post, index) => `
        <article class="post-card" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
          <div class="post-image">
            <span class="post-image-icon">${post.title.charAt(0)}</span>
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="post-author">@${post.author.replace(/\s+/g, '_').toLowerCase()}</span>
              <span class="post-date">${formatDate(post.date)}</span>
            </div>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-excerpt">${truncateText(post.content, 150)}</p>
            <a href="#" class="read-more">Read Article →</a>
          </div>
        </article>
      `).join('');
    } else {
      container.innerHTML = '<p style="text-align: center; color: #a0a0b0; font-family: var(--font-mono);">// No posts available in database</p>';
    }
  });
}

if (document.getElementById('post-form')) {
  const form = document.getElementById('post-form');
  const successMessage = document.getElementById('success-message');
  const submitBtn = form.querySelector('.btn-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Button morphing: Loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<span style="opacity: 0;">Submitting...</span>';
    
    const post = {
      id: Date.now().toString(),
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      content: document.getElementById('content').value,
      date: new Date().toISOString()
    };

    const result = await savePost(post);
    
    if (result) {
      // Button morphing: Success state
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.innerHTML = '✓ Published';
      
      successMessage.style.display = 'block';
      form.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.classList.remove('success');
        submitBtn.innerHTML = 'Publish Article';
      }, 3000);
    } else {
      // Error state
      submitBtn.classList.remove('loading');
      submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
      submitBtn.innerHTML = '✗ Failed';
      
      setTimeout(() => {
        submitBtn.style.background = '';
        submitBtn.innerHTML = 'Publish Article';
      }, 2000);
    }
  });
}
