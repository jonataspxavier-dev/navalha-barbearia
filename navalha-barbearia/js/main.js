/* Orquestração geral: serviços, horário de funcionamento, rodapé */

(function () {
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map(
      (service) => `
        <article class="service-card">
          <div class="service-card__header">
            <h3>${service.name}</h3>
            <span class="service-card__price">R$ ${service.price}</span>
          </div>
          <p>${service.description}</p>
          <p class="service-card__meta">${service.duration} min</p>
        </article>
      `
    ).join('');
  }

  function populateServiceSelect() {
    const select = document.getElementById('service');
    if (!select) return;

    SERVICES.forEach((service) => {
      const option = document.createElement('option');
      option.value = String(service.id);
      option.textContent = `${service.name} — R$ ${service.price} (${service.duration} min)`;
      select.appendChild(option);
    });
  }

  function timeToMinutes(value) {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function renderHours() {
    const list = document.getElementById('hoursList');
    const statusBadge = document.getElementById('openStatus');
    if (!list || !statusBadge) return;

    list.innerHTML = BUSINESS_HOURS.map(
      (entry) => `
        <li>
          <span>${entry.day}</span>
          <span>${entry.open ? `${entry.open} – ${entry.close}` : 'Fechado'}</span>
        </li>
      `
    ).join('');

    const now = new Date();
    const today = BUSINESS_HOURS.find((entry) => entry.weekday === now.getDay());
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const isOpen =
      today && today.open && nowMinutes >= timeToMinutes(today.open) && nowMinutes < timeToMinutes(today.close);

    statusBadge.textContent = isOpen ? 'Aberto agora' : 'Fechado agora';
    statusBadge.classList.add(isOpen ? 'status-badge--open' : 'status-badge--closed');
  }

  function renderFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function setupScrollReveal() {
    const targets = document.querySelectorAll('.section-title, .service-card, .gallery__item, .booking__form, .hours-map__grid > div');
    targets.forEach((el) => el.classList.add('reveal'));

    const staggerGroups = document.querySelectorAll('.services__grid, .gallery__grid');
    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function setupHeaderScrollShadow() {
    const header = document.getElementById('header');
    if (!header) return;

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }

    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  renderServices();
  populateServiceSelect();
  renderHours();
  renderFooterYear();
  setupScrollReveal();
  setupHeaderScrollShadow();
})();
