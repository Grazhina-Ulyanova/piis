document.addEventListener('DOMContentLoaded', () => {
  // --- ЭЛЕМЕНТЫ ---
  const blogSetupForm = document.getElementById('blog-setup-form');
  const createBlogSection = document.getElementById('create-blog');
  const blogSection = document.getElementById('blog');
  const blogHeader = document.querySelector('.blog-header');
  const displayBlogTitle = document.getElementById('display-blog-title');
  const displayBlogTopic = document.getElementById('display-blog-topic');
  const displayBlogNickname = document.getElementById('display-blog-nickname');
  const postForm = document.querySelector('.post-form');
  const postsContainer = document.getElementById('posts-container');
  const navLinks = document.querySelectorAll('.nav-link');
  const welcomeSection = document.getElementById('welcome');
  const aboutSection = document.getElementById('about');
  const footer = document.getElementById('footer');
  const postContent = document.getElementById('post-content');
  const themeToggle = document.querySelector('.theme-toggle');
  const burgerMenu = document.querySelector('.burger-menu');
  const navList = document.querySelector('.nav-list');
  const slides = document.querySelectorAll('.carousel-item');

  // --- СТАНДАРТНЫЕ НАСТРОЙКИ ---
  createBlogSection.style.display = 'none';
  blogSection.style.display = 'none';
  blogHeader.style.display = 'none';
  welcomeSection.style.display = 'block';
  aboutSection.style.display = 'none';

  // --- ТЕМА ---
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-theme', savedTheme === 'dark');

  localStorage.clear();
  
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  // --- КАРУСЕЛЬ ---
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  }
  if (slides.length > 0) {
    showSlide(0);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // --- БУРГЕР ---
  burgerMenu?.addEventListener('click', () => {
    navList?.classList.toggle('active');
    burgerMenu.classList.toggle('active');
  });

  // --- ДАННЫЕ БЛОГА И ПОСТЫ ---
  let blogData = JSON.parse(localStorage.getItem('blogData'));
  let posts = [];

  function showCreateBlog() {
    createBlogSection.style.display = 'block';
    blogSection.style.display = 'none';
    blogHeader.style.display = 'none';
  }

  function showBlog() {
    createBlogSection.style.display = 'none';
    blogSection.style.display = 'block';
    blogHeader.style.display = 'block';
    displayBlogTitle.textContent = blogData.title;
    displayBlogTopic.textContent = blogData.topic;
    displayBlogNickname.textContent = blogData.nickname;
    renderPosts();
  }

  blogSetupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('blog-title').value.trim();
    const topic = document.getElementById('blog-topic').value.trim();
    const nickname = document.getElementById('blog-nickname').value.trim();
    if (title && topic && nickname) {
      blogData = { title, topic, nickname };
      localStorage.setItem('blogData', JSON.stringify(blogData));
      showBlog();
    } else{
      createPostElement();
    }
  });

  function createPostElement(content, likes = 0, date = new Date().toLocaleDateString()) {
    const post = document.createElement('article');
    post.className = 'post';

    const authorElement = document.createElement('div');
    authorElement.className = 'post-author';
    const blogData = JSON.parse(localStorage.getItem('blogData'));
    authorElement.textContent = blogData?.nickname || 'Автор';

    const contentElement = document.createElement('p');
    contentElement.className = 'post-content';
    contentElement.textContent = content;

    const metaElement = document.createElement('div');
    metaElement.className = 'post-meta';

    const likesElement = document.createElement('span');
    likesElement.className = 'likes';
    likesElement.textContent = `❤️ ${likes}`;

    const timeElement = document.createElement('time');
    timeElement.textContent = date;

    metaElement.append(likesElement, timeElement);
    post.append(authorElement, contentElement, metaElement);

    return post;
  }

  function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postEl = createPostElement(post.content, post.likes, post.date);
      postsContainer.appendChild(postEl);
    });
  }

  postForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = postContent.value.trim();
    if (!content || content.length > 1000) return;
    const post = {
      content,
      likes: Math.floor(Math.random() * 100),
      date: new Date().toLocaleDateString()
    };
    posts.unshift(post);
    renderPosts();
    postContent.value = '';
    savePosts();
  });

  function savePosts() {
    const postData = posts.map(post => ({
      content: post.content,
      likes: post.likes,
      date: post.date
    }));
    localStorage.setItem('posts', JSON.stringify(postData));
  }

  function loadPosts() {
    try {
      posts = JSON.parse(localStorage.getItem('posts')) || [];
      renderPosts();
    } catch (e) {
      console.error('Ошибка загрузки постов:', e);
    }
  }

  loadPosts();

  // --- НАВИГАЦИЯ ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#footer') {
        e.preventDefault();
        footer.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      welcomeSection.style.display = 'none';
      aboutSection.style.display = 'none';
      createBlogSection.style.display = 'none';
      blogSection.style.display = 'none';
      blogHeader.style.display = 'none';

      if (target === '#home') {
        welcomeSection.style.display = 'block';
      } else if (target === '#about') {
        aboutSection.style.display = 'block';
      } else if (target === '#blog') {
        if (blogData?.title && blogData?.topic && blogData?.nickname) {
          showBlog();
        } else {
          showCreateBlog();
        }
      }

      document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
      e.preventDefault();
    });
  });
});
