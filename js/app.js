const API_BASE = 'data';

async function loadPosts() {
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const post = {
      id: Date.now().toString(),
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      content: document.getElementById('content').value,
      date: new Date().toISOString()
    };

    const result = await savePost(post);
    if (result) {
      successMessage.style.display = 'block';
      form.reset();
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } else {
      alert('Failed to save post. Please try again.');
    }
  });
}
