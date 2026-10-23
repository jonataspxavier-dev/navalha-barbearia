/* Carrossel de depoimentos: autoplay com pausa no hover */

(function () {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('testimonialsDots');
  if (!track || !dotsContainer) return;

  const AUTOPLAY_DELAY = 6000;
  let currentIndex = 0;
  let timer = null;

  function render() {
    track.innerHTML = TESTIMONIALS.map(
      (item, index) => `
        <blockquote class="testimonial${index === 0 ? ' is-active' : ''}" data-index="${index}">
          <p class="testimonial__quote">“${escapeHTML(item.quote)}”</p>
          <footer class="testimonial__author">${escapeHTML(item.author)}</footer>
        </blockquote>
      `
    ).join('');

    dotsContainer.innerHTML = TESTIMONIALS.map(
      (item, index) => `
        <button type="button" class="${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Ver depoimento ${index + 1}"></button>
      `
    ).join('');

    dotsContainer.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => goTo(Number(btn.dataset.index)));
    });
  }

  function goTo(index) {
    currentIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;

    track.querySelectorAll('.testimonial').forEach((el, i) => {
      el.classList.toggle('is-active', i === currentIndex);
    });
    dotsContainer.querySelectorAll('button').forEach((el, i) => {
      el.classList.toggle('is-active', i === currentIndex);
    });
  }

  function next() {
    goTo(currentIndex + 1);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  render();
  startAutoplay();

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  track.addEventListener('focusin', stopAutoplay);
  track.addEventListener('focusout', startAutoplay);
})();
