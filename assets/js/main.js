// ==========================================================================
// Barbearia Nakamura — interações do site
// ==========================================================================
(function () {
  'use strict';

  /* ---- Rodapé: ano automático ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha o menu ao clicar em qualquer link
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Header: sombra leve ao rolar (via classe, sem custo de layout) ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScrollHeader = function () {
      header.style.borderBottomColor = window.scrollY > 8
        ? 'rgba(196,144,70,.4)'
        : 'rgba(196,144,70,.22)';
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  /* ---- Scroll reveal (com rede de segurança: nunca deixa conteúdo
         permanentemente invisível caso o observer não dispare) ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });

    // Rede de segurança: qualquer elemento que já esteja no viewport
    // (ou muito perto dele) na carga da página é revelado de imediato,
    // sem esperar um evento de scroll que pode nunca disparar.
    revealEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Segunda rede de segurança: se por qualquer motivo algum elemento
  // não for revelado (observer não suportado corretamente, aba em
  // segundo plano, etc.), garante que nada fique escondido para sempre.
  window.setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }, 2500);

  /* ---- Galeria + lightbox ---- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var currentIndex = 0;
  var lastFocusedEl = null;

  function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    lightboxImg.src = item.getAttribute('data-full');
    lightboxImg.alt = item.getAttribute('data-alt') || '';
    lastFocusedEl = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { openLightbox(currentIndex - 1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { openLightbox(currentIndex + 1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
    });
  }
})();
