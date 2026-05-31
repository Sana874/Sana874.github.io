/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '14px'; cursor.style.height = '14px';
    follower.style.width = '50px'; follower.style.height = '50px'; follower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px'; cursor.style.height = '8px';
    follower.style.width = '30px'; follower.style.height = '30px'; follower.style.opacity = '0.5';
  });
});

/* ===========================
   MATRIX RAIN
=========================== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ∑∆Ω∏∫∂√∞{}[]<>∈⊂⊃∪∩';
const fontSize = 13;
const cols = Math.floor(canvas.width / fontSize);
const drops = Array(cols).fill(1);
function drawMatrix() {
  ctx.fillStyle = 'rgba(3,3,8,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px Share Tech Mono, monospace`;
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.globalAlpha = Math.random() > 0.9 ? 1 : 0.3;
    ctx.fillStyle = '#00ff9d';
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    ctx.globalAlpha = 1;
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

/* ===========================
   TYPEWRITER — NAME
=========================== */
const nameEl = document.getElementById('typewriter-name');
const name = 'Sana Firdous Abdul Kalam';
let nameIdx = 0;
function typeName() {
  if (nameIdx < name.length) {
    nameEl.textContent += name[nameIdx++];
    setTimeout(typeName, 50);
  }
}
setTimeout(typeName, 600);

/* ===========================
   ROLE CYCLE — WHAT SHE'S LOOKING FOR
=========================== */
const roles = [
  'AI/ML Internship',
  'Computer Vision Role',
  'Product Management Role',
  'Data Science Position',
  'Software Engineering Role',
  'LLM / GenAI Internship'
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const roleEl = document.getElementById('role-text');
function typeRole() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    roleEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 50 : 80);
}
setTimeout(typeRole, 1400);

/* ===========================
   NAVBAR
=========================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 200) current = sec.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ===========================
   HAMBURGER
=========================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    Object.assign(navMenu.style, { display:'flex', flexDirection:'column', position:'fixed', top:'60px', right:'0', background:'rgba(8,12,20,0.98)', border:'1px solid #1a2d4a', padding:'1.5rem', width:'220px', zIndex:'999' });
  } else {
    navMenu.style.display = 'none';
  }
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.section-reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   COUNTER — HERO STATS
=========================== */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===========================
   SKILL BARS
=========================== */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

/* ===========================
   STACKED PROJECT CARDS
=========================== */
const cards = Array.from(document.querySelectorAll('.project-card'));
const dotsContainer = document.getElementById('projDots');
let currentCard = 0;

cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'proj-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToCard(i));
  dotsContainer.appendChild(dot);
});

function updateCards(active) {
  cards.forEach((card, i) => {
    card.classList.remove('is-active', 'is-exiting');
    const relIdx = (i - active + cards.length) % cards.length;
    if (relIdx === 0) {
      card.style.setProperty('--card-index', '0');
      card.classList.add('is-active');
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    } else if (relIdx < 5) {
      card.style.setProperty('--card-index', String(relIdx));
      card.style.opacity = String(1 - relIdx * 0.2);
      card.style.pointerEvents = 'none';
    } else {
      card.style.setProperty('--card-index', '5');
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
    }
  });
  document.querySelectorAll('.proj-dot').forEach((d, i) => d.classList.toggle('active', i === active));
}

function goToCard(idx) {
  cards[currentCard].classList.add('is-exiting');
  setTimeout(() => {
    cards[currentCard].classList.remove('is-exiting');
    currentCard = idx;
    updateCards(currentCard);
  }, 300);
}

document.getElementById('nextCard').addEventListener('click', () => goToCard((currentCard + 1) % cards.length));
document.getElementById('prevCard').addEventListener('click', () => goToCard((currentCard - 1 + cards.length) % cards.length));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') goToCard((currentCard + 1) % cards.length);
  if (e.key === 'ArrowUp') goToCard((currentCard - 1 + cards.length) % cards.length);
});

// Touch swipe
let touchStartY = 0;
const stack = document.querySelector('.projects-stack');
if (stack) {
  stack.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; });
  stack.addEventListener('touchend', e => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 40) goToCard(diff > 0 ? (currentCard + 1) % cards.length : (currentCard - 1 + cards.length) % cards.length);
  });
}
updateCards(0);

/* ===========================
   CONTACT FORM
=========================== */

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (menuOpen && window.innerWidth < 900) { navMenu.style.display = 'none'; menuOpen = false; }
    }
  });
});

/* ===========================
   ORBIT LABELS — STAY UPRIGHT
=========================== */
document.querySelectorAll('.orbit-item').forEach(item => {
  const angle = parseFloat(item.style.getPropertyValue('--angle'));
  item.querySelector('span').style.transform = `rotate(${-angle}deg)`;
});
