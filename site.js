/* Progressive UI for the static site. Existing campaign attribution stays in script.js. */
(function () {
  'use strict';
  // Carry the existing allowlisted campaign across new pages when storage is blocked.
  const campaignLink = Array.from(document.querySelectorAll('a[href]')).find(link => {
    const url = new URL(link.href, window.location.href);
    return url.origin === window.location.origin &&
      url.searchParams.get('kt_source') === 'META-SITE-KARGO01' &&
      url.searchParams.get('utm_source') === 'meta' &&
      url.searchParams.get('utm_campaign') === '120253825252350747' &&
      url.searchParams.get('utm_content') === '120254749494740747';
  });
  if (campaignLink) {
    const campaignUrl = new URL(campaignLink.href);
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin ||
          !/\/(?:tasarimlar|konsol-alim|ps5-kol-tamiri|ps5-tamiri)\.html$/.test(url.pathname)) return;
      ['kt_source', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
        url.searchParams.set(key, campaignUrl.searchParams.get(key));
      });
      link.href = url.href;
    });
  }
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-menu');
  if (menuToggle && menu) {
    menuToggle.hidden = false;
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menüyü aç');
    };
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(expanded));
      menuToggle.setAttribute('aria-label', expanded ? 'Menüyü kapat' : 'Menüyü aç');
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
  }

  const status = document.getElementById('site-status');
  let statusTimeout;
  function notify(message) {
    if (!status) return;
    window.clearTimeout(statusTimeout);
    status.textContent = message;
    status.classList.add('visible');
    statusTimeout = window.setTimeout(() => status.classList.remove('visible'), 4500);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (_) { /* Use the selection-based fallback when permission is denied. */ }
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.appendChild(area);
    const focused = document.activeElement;
    try {
      area.select();
      if (!document.execCommand('copy')) throw new Error('Copy unavailable');
    } finally {
      area.remove();
      if (focused instanceof HTMLElement) focused.focus();
    }
  }

  document.querySelectorAll('[data-copy], [data-copy-url]').forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copyUrl
        ? new URL(button.dataset.copyUrl, window.location.href).href
        : button.dataset.copy;
      try {
        await copyText(text);
        notify(button.dataset.success || 'Kopyalandı.');
      } catch (_) {
        notify('Kopyalama açılamadı. Görünen bilgiyi seçerek kopyalayabilirsin.');
      }
    });
  });

  document.querySelectorAll('[data-print]').forEach(button => {
    button.addEventListener('click', () => window.print());
  });

  // Only verified public KonsolTech posts may become embeds. No third-party request
  // happens until the visitor activates a video; closing the dialog unloads it.
  const reelTitles = new Map([
    ['DYFL73bK9Lq', 'Analog seçeneklerini anlatıyoruz'],
    ['DZAzrLdKQeH', 'PS4 bakımını yakından gör'],
    ['DertJPtM-jQ', 'DualSense’e yeni bir görünüm'],
  ]);
  const reelDialog = document.getElementById('reel-dialog');
  if (reelDialog && typeof reelDialog.showModal === 'function') {
    const player = document.getElementById('reel-player');
    const title = document.getElementById('reel-dialog-title');
    const original = document.getElementById('reel-original');
    let activatedLink = null;
    document.querySelectorAll('a[data-reel]').forEach(link => {
      if (!reelTitles.has(link.dataset.reel)) return;
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        const id = link.dataset.reel;
        if (!reelTitles.has(id) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        activatedLink = link;
        title.textContent = reelTitles.get(id);
        original.href = 'https://www.instagram.com/konsoltekk/reel/' + id + '/';
        const frame = document.createElement('iframe');
        frame.title = 'KonsolTech Instagram videosu: ' + reelTitles.get(id);
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.allow = 'fullscreen; picture-in-picture';
        frame.allowFullscreen = true;
        frame.src = 'https://www.instagram.com/reel/' + id + '/embed/';
        player.replaceChildren(frame);
        reelDialog.showModal();
      });
    });
    reelDialog.querySelector('.reel-close').addEventListener('click', () => reelDialog.close());
    reelDialog.addEventListener('click', event => {
      if (event.target !== reelDialog) return;
      const bounds = reelDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) reelDialog.close();
    });
    reelDialog.addEventListener('close', () => {
      player.replaceChildren();
      if (activatedLink && activatedLink.isConnected) activatedLink.focus({ preventScroll: true });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const device = form.elements.device.value.trim();
      const fault = form.elements.fault.value.trim();
      if (!fault) {
        form.elements.fault.setCustomValidity('Arızanı veya talebini yaz.');
        form.elements.fault.reportValidity();
        return;
      }
      const trackedLink = document.querySelector('a[href^="https://wa.me/905454562041"]');
      const trackedMessage = trackedLink ? new URL(trackedLink.href).searchParams.get('text') || '' : '';
      const source = trackedMessage.endsWith('Bizi Instagram/Facebook reklamında gördüm.')
        ? '\nBizi Instagram/Facebook reklamında gördüm.' : '';
      const url = new URL('https://wa.me/905454562041');
      url.searchParams.set('text', 'Merhaba, servis için bilgi almak istiyorum.\nCihaz modelim: ' + device + '\nArıza / talep: ' + fault + source);
      window.open(url.href, '_blank', 'noopener,noreferrer');
    });
    form.elements.fault.addEventListener('input', () => form.elements.fault.setCustomValidity(''));
    form.querySelector('fieldset').disabled = false;
  }
})();
