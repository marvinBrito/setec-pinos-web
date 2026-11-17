(function () {
  'use strict';

  var PHONE = '593989807375';

  // Año del pie de página
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  // Galería: ver foto en grande
  var gallery = document.getElementById('gallery');
  var lb = document.getElementById('lightbox');
  if (gallery && lb && typeof lb.showModal === 'function') {
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-cap');
    gallery.addEventListener('click', function (e) {
      var btn = e.target.closest('.g');
      if (!btn) return;
      lbImg.src = btn.dataset.src;
      lbImg.alt = btn.querySelector('img').alt;
      lbCap.textContent = btn.dataset.cap || '';
      lb.showModal();
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) lb.close();
    });
  }

  // Cotizador: arma el mensaje y abre WhatsApp
  var form = document.getElementById('quote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var cant = parseInt(d.get('cant'), 10) || 1;
      var nombre = (d.get('nombre') || '').toString().trim();
      var sector = (d.get('sector') || '').toString().trim();

      var lines = [
        'Hola SETEC PINO\'S, quiero cotizar un servicio.',
        '',
        'Servicio: ' + d.get('servicio'),
        'Tipo de equipo: ' + d.get('tipo'),
        'Cantidad: ' + cant
      ];
      if (sector) lines.push('Sector: ' + sector);
      if (nombre) lines.push('Mi nombre: ' + nombre);

      var url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }
})();
