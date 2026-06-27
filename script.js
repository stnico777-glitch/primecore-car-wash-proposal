// Smooth nav highlight & mobile menu behavior
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  // Subtle nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(10, 10, 15, 0.92)';
      nav.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      nav.style.background = 'rgba(18, 18, 26, 0.75)';
      nav.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });

  // Active section tracking
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? '#ffffff'
              : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Animate elements on scroll
  const animateTargets = document.querySelectorAll(
    '.glass-card, .feature-item, .timeline__item, .faq-item'
  );

  animateTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animateTargets.forEach((el) => fadeObserver.observe(el));

  // QR timer countdown animation
  const timerEl = document.querySelector('.phone-mock__timer');
  if (timerEl) {
    let seconds = 47;
    setInterval(() => {
      seconds = seconds <= 0 ? 59 : seconds - 1;
      timerEl.textContent = `Refreshes in 0:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  }
});
