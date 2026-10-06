document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');

  const closeMenu = () => {
    if (!menu || !toggle) return;

    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');

      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu' : 'Abrir menu'
      );
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
      if (!menu.classList.contains('open')) return;

      if (
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Rolagem suave para links que apontam para seções da própria página.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const header = document.querySelector('.site-header');
      const headerOffset = header ? header.offsetHeight + 12 : 12;
      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });

      // Atualiza a URL sem provocar um salto.
      history.pushState(null, '', targetId);
    });
  });
});
