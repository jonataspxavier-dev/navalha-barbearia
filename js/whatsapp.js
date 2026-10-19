/* Botão de WhatsApp: projeto de portfólio, não redireciona de verdade */

(function () {
  const btn = document.getElementById('whatsappBtn');
  const tooltip = document.getElementById('whatsappTooltip');
  if (!btn || !tooltip) return;

  const MESSAGE = 'Este é um projeto de portfólio: o botão de WhatsApp é apenas ilustrativo e não envia mensagens reais.';
  let hideTimer = null;

  function showTooltip() {
    tooltip.textContent = MESSAGE;
    tooltip.classList.add('is-visible');
    tooltip.setAttribute('aria-hidden', 'false');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTooltip, 5000);
  }

  function hideTooltip() {
    tooltip.classList.remove('is-visible');
    tooltip.setAttribute('aria-hidden', 'true');
    clearTimeout(hideTimer);
  }

  btn.addEventListener('click', () => {
    if (tooltip.classList.contains('is-visible')) {
      hideTooltip();
    } else {
      showTooltip();
    }
  });

  document.addEventListener('click', (event) => {
    if (!btn.contains(event.target) && !tooltip.contains(event.target)) hideTooltip();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideTooltip();
  });
})();
