(function() {
  // Theme toggling code
  const themeSwitcher = document.getElementById('themeSwitcher');
  const themeIcon = document.getElementById('themeIcon');

  function updateSocialIcons(mode) {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      const newSrc = mode === 'dark' ? icon.getAttribute('data-dark') : icon.getAttribute('data-light');
      if (newSrc) {
        icon.src = newSrc;
      }
    });
  }

  function setTheme(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.textContent = 'dark_mode';
      themeSwitcher.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      themeIcon.textContent = 'wb_sunny';
      themeSwitcher.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('theme', mode);
    updateSocialIcons(mode);
  }

  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      setTheme(newMode);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.querySelector('.material-icons').textContent = isOpen ? 'close' : 'menu';
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('.material-icons').textContent = 'menu';
      });
    });
  }

  // Custom Cursor: Only enable on non-touch devices
  const customCursor = document.querySelector('.custom-cursor');
  if (customCursor && window.matchMedia('(hover: hover)').matches) {
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
      customCursor.style.top = e.clientY + 'px';
      customCursor.style.left = e.clientX + 'px';
    });

    // Pulse effect on click
    document.addEventListener('mousedown', () => {
      customCursor.classList.add('pulse');
    });
    document.addEventListener('mouseup', () => {
      customCursor.classList.remove('pulse');
    });

    // Add hover effects for interactive elements (links and buttons)
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hovered');
      });
    });
  }
})();
