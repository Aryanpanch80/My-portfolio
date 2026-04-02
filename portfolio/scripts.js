const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function applyInitialTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

function revealOnScroll() {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
  cards.forEach((card) => observer.observe(card));
}

function smoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const siteNav = document.querySelector('.site-nav');
      if (siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        const toggle = document.getElementById('mobileNavToggle');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function mobileNav() {
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const siteNav = document.querySelector('.site-nav');

  if (!mobileNavToggle || !siteNav) return;

  mobileNavToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function activeSectionObserver() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href').replace('#', '');
          link.classList.toggle('active', href === id);
        });
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  applyInitialTheme();
  revealOnScroll();
  smoothLinks();
  mobileNav();
  activeSectionObserver();
});
