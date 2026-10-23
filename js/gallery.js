/* Galeria com lightbox acessível (teclado + ESC) */

(function () {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  let currentIndex = 0;
  let triggerEl = null;
  let lightbox = null;

  function renderGrid() {
    grid.innerHTML = GALLERY.map((item, index) => {
      const alt = escapeHTML(item.alt);
      return `
        <div class="gallery__item">
          <button type="button" data-index="${index}" aria-label="Ampliar foto: ${alt}">
            <img src="${escapeHTML(item.src)}" alt="${alt}" loading="lazy" width="700" height="525" />
          </button>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('button[data-index]').forEach((btn) => {
      btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index), btn));
    });
  }

  function buildLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualização de imagem da galeria');
    lightbox.innerHTML = `
      <button type="button" class="lightbox__close" aria-label="Fechar">&times;</button>
      <button type="button" class="lightbox__prev" aria-label="Foto anterior">&#8249;</button>
      <img class="lightbox__image" alt="" />
      <button type="button" class="lightbox__next" aria-label="Próxima foto">&#8250;</button>
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => showImage(currentIndex - 1));
    lightbox.querySelector('.lightbox__next').addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('keydown', onLightboxKeydown);
  }

  function showImage(index) {
    currentIndex = (index + GALLERY.length) % GALLERY.length;
    const item = GALLERY[currentIndex];
    const img = lightbox.querySelector('.lightbox__image');
    img.src = item.src;
    img.alt = item.alt;
  }

  function openLightbox(index, trigger) {
    triggerEl = trigger;
    showImage(index);
    lightbox.classList.add('is-open');
    lightbox.querySelector('.lightbox__close').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (triggerEl) triggerEl.focus();
  }

  function onLightboxKeydown(event) {
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (event.key === 'Tab') {
      const focusables = lightbox.querySelectorAll('button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  renderGrid();
  buildLightbox();
})();
