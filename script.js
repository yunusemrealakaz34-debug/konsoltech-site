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

// Keep only known campaign codes; never forward arbitrary URL parameters to WhatsApp.
(function () {
  'use strict';
  const code = 'META-SITE-KARGO01';
  const storageKey = 'kt_source_v1';
  const params = new URLSearchParams(window.location.search);
  const fromAd = params.get('kt_source') === code &&
    params.get('utm_campaign') === '120253825252350747' &&
    params.get('utm_content') === '120254749494740747' &&
    params.get('utm_source') === 'meta';
  let source = fromAd ? code : '';
  try {
    if (fromAd) window.sessionStorage.setItem(storageKey, code);
    else if (window.sessionStorage.getItem(storageKey) === code) source = code;
  } catch (_) { /* Private browsing may disable storage; current-page attribution still works. */ }

  document.querySelectorAll('a[href]').forEach(function (link) {
    let url;
    try { url = new URL(link.getAttribute('href'), window.location.href); }
    catch (_) { return; }
    if (url.protocol === 'https:' && url.hostname === 'wa.me' && url.pathname === '/905454562041') {
      const message = url.searchParams.get('text') ||
        'Merhaba, kargoyla tamir için bilgi almak istiyorum.\nCihaz modelim: …\nArıza: …\nŞehir: …';
      url.searchParams.set('text', message + '\nKaynak: ' + (source || 'SITE-DOGRUDAN'));
      link.href = url.toString();
    } else if (source && url.origin === window.location.origin &&
               /\/(?:index|hizmetler|kargo|paketler|surec|neden-biz|sss|iletisim)\.html$/.test(url.pathname)) {
      // Preserve the source across site pages even when session storage is unavailable.
      url.searchParams.set('kt_source', code);
      url.searchParams.set('utm_source', 'meta');
      url.searchParams.set('utm_medium', 'paid_social');
      url.searchParams.set('utm_campaign', '120253825252350747');
      url.searchParams.set('utm_content', '120254749494740747');
      link.href = url.toString();
    }
  });
})();
