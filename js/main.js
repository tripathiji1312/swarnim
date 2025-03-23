// Typewriter Effect for Hero Subtitle
const typewriterElement = document.querySelector('.typewriter');
const typeTexts = ["BACKEND DEVELOPER", "PROBLEM SOLVER", "TECH VISIONARY"];
let typeIndex = 0, charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingSpeed = 100, pauseBetween = 2000;
function type() {
  if (typeIndex >= typeTexts.length) typeIndex = 0;
  currentText = typeTexts[typeIndex];
  if (!isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, pauseBetween);
      return;
    }
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { isDeleting = false; typeIndex++; }
  }
  setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
}
if (typewriterElement) type();

// Glitch Effect on Portrait (targeting .glitch-effect within .hero-portrait)
const glitchElement = document.querySelector('.hero-portrait .glitch-effect');
function triggerGlitch() {
  if (glitchElement) {
    glitchElement.classList.add('active-glitch');
    setTimeout(() => { glitchElement.classList.remove('active-glitch'); }, 500);
  }
}
setInterval(() => { if (Math.random() < 0.3) triggerGlitch(); }, 5000);

// Navigation Bar Scroll Effects (targeting .brutal-nav)
const navBar = document.querySelector('.brutal-nav');
function handleScroll() {
  let scrollY = window.scrollY;
  if (scrollY > 100) {
    navBar.classList.add('shrink');
  } else {
    navBar.classList.remove('shrink');
  }
}
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 50);
});

// Intersection Observer for Scroll Animations with Desktop Fallback
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (window.innerWidth > 1024) {
    elements.forEach(el => el.classList.add('animated'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('animated'));
  }
};
animateOnScroll();

// Menu Highlighting Based on Visible Section
const sections = document.querySelectorAll('section.brutal-section');
const navItems = document.querySelectorAll('.brutal-nav .nav-item');
function highlightMenu() {
  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-section") === currentSection) {
      item.classList.add("active");
    }
  });
}
window.addEventListener("scroll", highlightMenu);

// Projects - Tilt Effect for Project Cards
const projectCards = document.querySelectorAll('.project-item');
projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, { rotationY: x / 20, rotationX: -y / 20, ease: 'power2.out', duration: 0.3 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power2.out', duration: 0.5 });
  });
});

// Contact Form Submission with Loading Feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      alert("Message sent successfully!");
      contactForm.reset();
    }, 2000);
  });
}

// Dark Mode Toggle with Preference Saving
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")){
    localStorage.setItem("theme", "dark");
    darkModeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
  } else {
    localStorage.setItem("theme", "light");
    darkModeToggle.innerHTML = '<span class="toggle-icon">🌙</span>';
  }
});
window.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
  }
});

// Scroll-to-Top Functionality
const scrollToTop = document.querySelector(".scroll-to-top");
if (scrollToTop) {
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
