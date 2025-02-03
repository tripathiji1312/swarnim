// Custom Cursor Effect Animation
const cursorEffect = document.querySelector('.cursor-effect');
let targetX = window.innerWidth / 2,
    targetY = window.innerHeight / 2;
let effectX = targetX,
    effectY = targetY;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateCursorEffect() {
  effectX += (targetX - effectX) * 0.15;
  effectY += (targetY - effectY) * 0.15;
  cursorEffect.style.transform = `translate(${effectX}px, ${effectY}px)`;
  requestAnimationFrame(animateCursorEffect);
}
animateCursorEffect();

// Theme Toggle (default light mode)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  themeIcon.textContent = mode === 'dark' ? 'dark_mode' : 'light_mode';
  localStorage.setItem('theme', mode);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  setTheme(currentMode === 'light' ? 'dark' : 'light');
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  navMobile.style.display = navMobile.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.style.display = 'none';
  });
});

// Auto-update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Animate Social Sidebar Transition (only on desktop)
window.addEventListener('scroll', () => {
  const heroHeight = document.getElementById('hero').offsetHeight;
  const socialSidebar = document.querySelector('.social-sidebar');
  if (window.innerWidth > 768) {
    if (window.scrollY > heroHeight - 50) {
      socialSidebar.classList.add('moved');
    } else {
      socialSidebar.classList.remove('moved');
    }
  }
});
