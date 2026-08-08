// Dynamic footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Responsive navigation toggle
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const links = navToggle.nextElementSibling || document.querySelector('.nav-links');
    if (links) {
      links.classList.toggle('open');
    }
    navToggle.classList.toggle('active');
  });
}

// Page transition: fade-in on load
document.body.classList.add('fade-in');

// Avoid fade-out state issues when using browser back/forward buttons (bfcache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
  }
});

// Highlight the active navigation link based on current page
function updateActiveLink() {
  let current = window.location.pathname.split('/').pop();
  if (current === '' || current === '/') {
    current = 'index.html';
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
updateActiveLink();

// Page transition: intercept local links to fade-out page before navigating
document.querySelectorAll('a').forEach(a => {
  if (a.target === '_blank') return;
  
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('//') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('javascript:')
    ) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  });
});

// Scroll reveal animation for page sections and elements
const revealEls = document.querySelectorAll(
  '.pro-section, .project-card, .tech-item, .exp-item, .pro-card, .contact-card'
);

if (typeof IntersectionObserver !== 'undefined' && revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => observer.observe(el));
}

// Toggle scrolled header style when scroll position changes
window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 10);
});