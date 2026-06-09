const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => observer.observe(el));

const links = document.querySelectorAll('a[href^="#"]');
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');

if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const section = document.querySelector(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (menuToggle && mainMenu) {
        mainMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (!menuToggle || !mainMenu) return;
  const clickedInsideMenu = mainMenu.contains(e.target);
  const clickedToggle = menuToggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    mainMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
