/* ============================================
   ARM SECURITY PORTFOLIO — script.js
   ============================================ */

/* ── MATRIX RAIN ── */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const fontSize = 14;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1);
    ctx.font = fontSize + 'px Share Tech Mono';
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,11,5,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff41';

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 14, y * 14);
      if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

/* ── TOOLS DATA ── */
const ALL_TOOLS = [
  { name: 'Kali Linux',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kali_Linux_2.0_wordmark.svg/200px-Kali_Linux_2.0_wordmark.svg.png' },
  { name: 'Wireshark',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wireshark_icon.svg/120px-Wireshark_icon.svg.png' },
  { name: 'Metasploit',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Metasploit_logo_and_wordmark.png/200px-Metasploit_logo_and_wordmark.png' },
  { name: 'Burp Suite',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Burp_Suite_Logo.png/120px-Burp_Suite_Logo.png' },
  { name: 'Nmap',        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nmap-logo-256x256.png/120px-Nmap-logo-256x256.png' },
  { name: 'Splunk',      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Splunk_logo.png/200px-Splunk_logo.png' },
  { name: 'Volatility',  img: 'https://avatars.githubusercontent.com/u/5750648?s=200&v=4' },
  { name: 'Autopsy',     img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Autopsy-logo.png/120px-Autopsy-logo.png' },
  { name: 'Python',      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/120px-Python-logo-notext.svg.png' },
  { name: 'Nessus',      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nessus_Logo.png/120px-Nessus_Logo.png' },
  { name: 'Snort',       img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Snort.png/120px-Snort.png' },
];

const SEC_TOOLS = [
  { name: 'Wireshark',  emoji: '🦈' },
  { name: 'Metasploit', emoji: '💣' },
  { name: 'Burp Suite', emoji: '🕷️' },
  { name: 'Nmap',       emoji: '🔍' },
  { name: 'Splunk',     emoji: '🛡️' },
  { name: 'Volatility', emoji: '🧠' },
  { name: 'Autopsy',    emoji: '🔎' },
  { name: 'Nessus',     emoji: '⚠️' },
];

const SYS_TOOLS = [
  { name: 'Kali Linux', emoji: '🐉' },
  { name: 'Python',     emoji: '🐍' },
  { name: 'Bash',       emoji: '💻' },
  { name: 'Linux',      emoji: '🖥️' },
  { name: 'Snort',      emoji: '📡' },
  { name: 'Git',        emoji: '📂' },
  { name: 'VirtualBox', emoji: '📦' },
  { name: 'OSINT',      emoji: '🌐' },
];

/* ── BUILD SKILL GRIDS ── */
function buildGrid(containerId, tools) {
  const container = document.getElementById(containerId);
  tools.forEach(t => {
    const el = document.createElement('div');
    el.className = 'tool-item';
    el.innerHTML = `
      <span style="font-size:2rem">${t.emoji}</span>
      <span>${t.name}</span>
    `;
    container.appendChild(el);
  });
}

buildGrid('sec-tools', SEC_TOOLS);
buildGrid('sys-tools', SYS_TOOLS);

/* ── GLITCH EFFECT ── */
(function glitch() {
  const el = document.querySelector('.glitch');
  if (!el) return;
  setInterval(() => {
    el.style.textShadow = `
      ${Math.random() * 4 - 2}px 0 #00f5c8,
      ${Math.random() * -4 + 2}px 0 #ff003c,
      0 0 20px #00ff41
    `;
    setTimeout(() => {
      el.style.textShadow = '0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.15)';
    }, 80);
  }, 3000);
})();

/* ── NAV ACTIVE LINK ── */
(function navHighlight() {
  const sections = document.querySelectorAll('section[id], div.section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#00ff41';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
