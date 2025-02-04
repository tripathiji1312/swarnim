// Custom Cursor Effect with smooth interpolation (slide override removed)

const cursorEffect = document.querySelector('.cursor-effect');
let targetX = window.innerWidth / 2,
    targetY = window.innerHeight / 2;
let effectX = targetX,
    effectY = targetY;
let currentScale = 1;
let targetScale = 1;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateCursorEffect() {
  effectX += (targetX - effectX) * 0.15;
  effectY += (targetY - effectY) * 0.15;
  
  if (cursorEffect.classList.contains('cursor-hover')) {
    targetScale = 1.5;
  } else if (cursorEffect.classList.contains('cursor-click')) {
    targetScale = 0.8;
  } else {
    targetScale = 1;
  }
  
  currentScale += (targetScale - currentScale) * 0.15;
  
  cursorEffect.style.transform = `translate3d(${effectX - (cursorEffect.offsetWidth / 2)}px, ${effectY - (cursorEffect.offsetHeight / 2)}px, 0) scale(${currentScale})`;
  
  requestAnimationFrame(animateCursorEffect);
}
animateCursorEffect();

const interactiveElements = document.querySelectorAll('a, button, .project-link, .hamburger, .mobile-link');

interactiveElements.forEach(elem => {
  elem.addEventListener('mouseover', () => {
    cursorEffect.classList.add('cursor-hover');
  });
  elem.addEventListener('mouseout', () => {
    cursorEffect.classList.remove('cursor-hover');
  });
  elem.addEventListener('mousedown', () => {
    cursorEffect.classList.add('cursor-click');
  });
  elem.addEventListener('mouseup', () => {
    setTimeout(() => {
      cursorEffect.classList.remove('cursor-click');
    }, 150);
  });
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const socialIconImages = document.querySelectorAll('.social-icon');

function updateSocialIcons(mode) {
  socialIconImages.forEach(img => {
    const newSrc = mode === 'dark' ? img.getAttribute('data-dark') : img.getAttribute('data-light');
    if (newSrc) {
      img.src = newSrc;
    }
  });
}

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  themeIcon.textContent = mode === 'dark' ? 'dark_mode' : 'light_mode';
  localStorage.setItem('theme', mode);
  updateSocialIcons(mode);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  setTheme(currentMode === 'light' ? 'dark' : 'light');
});

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

document.getElementById('year').textContent = new Date().getFullYear();

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
