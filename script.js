// KonsolTech — UI Enhancements
(function() {
  'use strict';

  // === 1. SCROLL TO TOP BUTTON ===
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'kt-scroll-top';
  scrollBtn.setAttribute('aria-label', 'Sayfa başına çık');
  scrollBtn.setAttribute('title', 'Yukarı çık');
  scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollBtn);

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        scrollBtn.classList.toggle('show', window.pageYOffset > 500);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // === 2. FADE-IN ON SCROLL ===
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('kt-in-view');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Animate these blocks as they scroll into view
    const animateSelectors = [
      '.kt-section .kt-section-title',
      '.kt-console-card',
      '.kt-trust-item',
      '.kt-atolye-img',
      '.kt-atolye-text',
      '.kt-stat',
      '.kt-cta-final',
      '.kt-service-card',
      '.kt-tier-card',
      '.kt-step',
      '.accordion-item',
    ];
    document.querySelectorAll(animateSelectors.join(',')).forEach(el => {
      el.classList.add('kt-fade-init');
      fadeObserver.observe(el);
    });
  }

  // === 3. NAVBAR ON SCROLL — add subtle shadow when scrolling ===
  const nav = document.querySelector('.kt-nav');
  if (nav) {
    let navTicking = false;
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('kt-nav-scrolled', window.pageYOffset > 20);
          navTicking = false;
        });
        navTicking = true;
      }
    });
  }

  // === 4. LAZY HERO VIDEO — only play when visible (saves CPU) ===
  const heroVideo = document.querySelector('.kt-hero video');
  if (heroVideo && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.25 });
    videoObserver.observe(heroVideo);
  }
})();
