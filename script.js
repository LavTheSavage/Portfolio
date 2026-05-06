const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    const mode = document.body.getAttribute("data-mode");

    if (mode === "professional") {
      window.location.href = "chill-home.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

const mode = document.body.dataset.mode;

// responsive navigation toggle
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const links = navToggle.nextElementSibling || document.querySelector('.nav-links');
    if (links) links.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

// page fade-in/out transitions
document.body.classList.add('fade-in');
window.addEventListener('beforeunload', () => {
  document.body.classList.add('fade-out');
});

// intercept links to allow fade-out and mark active
function updateActiveLink() {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .chill-links a').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
updateActiveLink();

document.querySelectorAll('a').forEach(a => {
  if (a.target === '_blank') return;
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.indexOf('http') !== 0 && href.indexOf('#') !== 0) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location = href; }, 500);
    }
  });
});

// loader overlay
const existingLoader = document.getElementById('loader');
const loader = existingLoader || (() => {
  const el = document.createElement('div');
  el.id = 'loader';
  el.className = 'loader';
  el.textContent = 'SYSTEM BOOTING...';
  document.body.appendChild(el);
  return el;
})();

const path = window.location.pathname.split('/').pop();
const isChillHome = mode === 'chill' && (path === 'chill-home.html' || path === '');
let sequenceDone = !isChillHome;
let pageLoaded = false;

function hideLoader() {
  loader.classList.add('hidden');
}

function maybeHideLoader() {
  if (sequenceDone && pageLoaded) {
    hideLoader();
  }
}

function runChillBootSequence() {
  const statusEl = loader.querySelector('[data-loader-status]');
  const progressEl = loader.querySelector('[data-loader-progress]');
  const logEl = loader.querySelector('[data-loader-log]');
  const startBtn = loader.querySelector('[data-loader-start]');

  if (!statusEl || !progressEl || !logEl || !startBtn) {
    sequenceDone = true;
    maybeHideLoader();
    return;
  }

  const techTerms = [
    'TCP_HANDSHAKE',
    'SSH_TUNNEL',
    'AES256',
    'ZERO_TRUST',
    'PKI_CHAIN',
    'GRAPH_QL',
    'EDGE_CACHE',
    'JWT_TOKEN',
    'NEURAL_NET',
    'KERNEL_PATCH',
    'MEMORY_MAP',
    'API_GATEWAY',
    'MESH_ROUTING',
    'TLS_CERT',
    'CDN_SYNC',
    'QUERY_PLAN',
    'LOAD_BALANCER',
    'VECTOR_INDEX',
    'DNS_RESOLVER',
    'SANDBOX_ESCAPE',
    'NEON_PROXY',
    'PACKET_TRACE',
    'QUANTUM_SEED',
    'KUBERNETES_POD',
    'REDIS_CACHE',
    'BGP_ROUTE',
    'IPTABLES_RULE',
    'CLI_SHELL'
  ];

  const loopStates = [
    'Listening for operator input...',
    'Mainframe link on standby...',
    'Indexing data fragments...',
    'Monitoring encrypted channels...'
  ];

  let idleLogTimer = null;
  let idleProgressTimer = null;
  let finalTimer = null;
  let loopProgress = 0;
  let loopIndex = 0;
  let started = false;
  const randomHex = () => Math.random().toString(16).slice(2, 10).toUpperCase();

  const pushLog = (message) => {
    const line = document.createElement('li');
    line.textContent = message;
    logEl.appendChild(line);
    if (logEl.children.length > 6) {
      logEl.removeChild(logEl.firstElementChild);
    }
  };

  const startIdleLoop = () => {
    statusEl.textContent = 'Awaiting command: parse_to_mainframe';
    pushLog('root@mainframe:~$ boot --secure');
    pushLog(`[OK] session token ${randomHex()} issued`);
    pushLog('[SYS] Press to start parsing pipeline.');

    idleProgressTimer = setInterval(() => {
      loopProgress = (loopProgress + 7) % 101;
      progressEl.style.width = `${loopProgress}%`;
      if (loopProgress % 28 === 0) {
        statusEl.textContent = loopStates[loopIndex % loopStates.length];
        loopIndex += 1;
      }
    }, 140);

    idleLogTimer = setInterval(() => {
      const term = techTerms[Math.floor(Math.random() * techTerms.length)];
      pushLog(`root@mainframe:~$ scan ${term.toLowerCase()} --id ${randomHex()}`);
    }, 280);
  };

  const startFinalSequence = () => {
    if (started) return;
    started = true;
    startBtn.classList.add('started');
    clearInterval(idleLogTimer);
    clearInterval(idleProgressTimer);

    const bootSteps = [
      'Authorizing operator key...',
      'Accessing profile node...',
      'Parsing experience archives...',
      'Compiling project metadata...',
      'Routing packets to mainframe...',
      'Rendering visual interface...'
    ];

    let index = 0;
    finalTimer = setInterval(() => {
      const step = bootSteps[index];
      const percent = Math.round(((index + 1) / bootSteps.length) * 100);
      statusEl.textContent = step;
      progressEl.style.width = `${percent}%`;
      pushLog(`[OK] ${step} [${randomHex()}]`);

      index += 1;
      if (index >= bootSteps.length) {
        clearInterval(finalTimer);
        statusEl.textContent = 'Connection stable. Welcome back.';
        sequenceDone = true;
        maybeHideLoader();
      }
    }, 360);
  };

  startIdleLoop();

  const beginFromInput = () => {
    startFinalSequence();
    window.removeEventListener('keydown', onKeyStart);
    loader.removeEventListener('pointerdown', onPointerStart);
  };

  const onPointerStart = () => beginFromInput();
  const onKeyStart = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      beginFromInput();
    }
  };

  startBtn.addEventListener('click', beginFromInput);
  loader.addEventListener('pointerdown', onPointerStart);
  window.addEventListener('keydown', onKeyStart);
}

if (isChillHome) {
  runChillBootSequence();
}

window.addEventListener('load', () => {
  pageLoaded = true;
  maybeHideLoader();
});

if (mode === "professional") {
  const data = {
    greeting: "Software Developer",
    tagline: "Software developer with experience in cross-platform and web application development.",
    techStackText: "Flutter, Java, TypeScript, SQL, Supabase, Responsive Web Development",
    project1: "Rental marketplace app built with structured backend integration and scalable architecture.",
    project2: "Responsive web projects focused on maintainability, accessibility, and performance.",
    interestsText: "Basketball, Gym, Running, Volleyball"
  };

  const greeting = document.getElementById("greeting");
  const tagline = document.getElementById("tagline");
  const techStackText = document.getElementById("techStackText");
  const project1 = document.getElementById("project1");
  const project2 = document.getElementById("project2");
  const interestsText = document.getElementById("interestsText");

  if (greeting) greeting.textContent = data.greeting;
  if (tagline) tagline.textContent = data.tagline;
  if (techStackText) techStackText.textContent = data.techStackText;
  if (project1) project1.textContent = data.project1;
  if (project2) project2.textContent = data.project2;
  if (interestsText) interestsText.textContent = data.interestsText;
}

// matrix mode enhancements
if (mode === 'chill') {
  // create ambient cyber background (replaces old 0/1 rain)
  const rain = document.querySelector('.matrix-rain') || (() => {
    const el = document.createElement('div');
    el.className = 'matrix-rain';
    document.body.appendChild(el);
    return el;
  })();
  rain.textContent = '';
  if (!rain.children.length) {
    const symbols = ['<>', '{}', '::', '//', '#', '*', '[]'];
    for (let i = 0; i < 22; i += 1) {
      const node = document.createElement('span');
      node.className = 'cyber-node';
      node.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      node.style.setProperty('--x', `${Math.random() * 100}%`);
      node.style.setProperty('--delay', `${(Math.random() * 6).toFixed(2)}s`);
      node.style.setProperty('--dur', `${(8 + Math.random() * 10).toFixed(2)}s`);
      rain.appendChild(node);
    }
  }
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mark active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.style.color = 'var(--pro-text)';
  }
});

// Scroll-reveal for sections
const revealEls = document.querySelectorAll(
  '.pro-section, .project-card, .tech-item, .exp-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 10);
});