/* Modo escuro com preferência salva */

(function () {
  const STORAGE_KEY = 'navalha-theme';
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro');
    }
  }

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  }
})();
