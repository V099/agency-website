/* ═══ STR AI Autopilot — Premium Interactions ═══ */

// ── Sticky Nav ──
const nav = document.getElementById('nav');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
      updateActiveNav();
      lastScroll = window.scrollY;
      ticking = false;
    });
    ticking = true;
  }
});

// ── Mobile Menu ──
const toggle = document.getElementById('mobile-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  links.classList.toggle('active');
  toggle.classList.toggle('open');
});
// Close on link click
links.querySelectorAll('.nav__link').forEach(l => {
  l.addEventListener('click', () => links.classList.remove('active'));
});

// ── Active Nav Link ──
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('nav__link--active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ── Scroll Reveal with Stagger ──
const revealEls = document.querySelectorAll(
  '.outcome__card, .module__card, .roadmap__step, .ideal__card, .cta__inner, .section__header'
);
revealEls.forEach(el => {
  el.classList.add('reveal');
  // Set stagger index per parent group
  const siblings = el.parentElement.querySelectorAll('.reveal');
  const idx = Array.from(siblings).indexOf(el);
  el.style.setProperty('--stagger', idx);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ── Smooth parallax on hero glows (rAF-throttled) ──
let mouseX = 0, mouseY = 0;
let rafId = null;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      document.querySelectorAll('.hero__glow').forEach((glow, i) => {
        const dir = i === 0 ? 1 : -1;
        glow.style.transform = `translate(${mouseX * dir}px, ${mouseY * dir}px)`;
      });
      rafId = null;
    });
  }
});
