/* ============================================================
   Alexandre Ramos Moreno | ARM://sec — script.js
   ============================================================ */

/* ── MATRIX RAIN ── */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars = 'アカサタナハマヤ01アイウエ$#ABCXYZ'.split('');

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols  = Math.floor(W / 14);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff41';
    ctx.font = '14px Share Tech Mono';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 14, y * 14);
      if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

/* ── TYPING EFFECT ── */
(function () {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const words = [
    'Analista de Ciberseguridad',
    'Pentester',
    'Blue Team & Red Team',
    'DFIR Enthusiast',
    'Alexandre Ramos Moreno'
  ];
  let wi = 0, ci = 0, del = false;

  function type() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; setTimeout(type, 1600); return; }
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, del ? 45 : 90);
  }
  type();
})();

/* ── HAMBURGER MENU ── */
(function () {
  const btn = document.querySelector('.hamburger-btn');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
})();

/* ── CLASSIFIED CARDS UNLOCK ── */
(function () {
  function relock(card) {
    card.innerHTML = '<div class="classified-label">📁 DOCUMENTO CLASIFICADO</div>';
    card.classList.remove('unlocked');
    card.classList.add('inactive');
  }

  function unlock(card) {
    if (!card.classList.contains('inactive')) return;
    const html = card.dataset.projectHtml;
    if (!html) return;

    card.classList.remove('inactive');
    card.classList.add('unlocked');
    card.innerHTML = '<div class="lock-break"></div>' + html;

    setTimeout(() => relock(card), 5000);
  }

  document.querySelectorAll('.matrix-card.inactive').forEach(card => {
    card.addEventListener('click', () => unlock(card));
  });
})();

/* ── PROGRESS BARS ANIMATE ON SCROLL ── */
(function () {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => { entry.target.style.width = width; }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => observer.observe(b));
})();

/* ── NAV ACTIVE HIGHLIGHT ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-list a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-list a[href="#${e.target.id}"]`);
        if (active) active.style.color = '#00ffe7';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
