document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');

  /* =========================================
     MENU MOBILE
  ========================================= */

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
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }


  /* =========================================
     ROLAGEM SUAVE ENTRE SEÇÕES
  ========================================= */

  const smoothScrollTo = (target) => {
    const header = document.querySelector('.site-header');

    const headerHeight = header
      ? header.getBoundingClientRect().height
      : 0;

    const offset = headerHeight + 20;

    const start = window.scrollY;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    const distance = targetPosition - start;

    /*
      Duração da animação.

      Quanto maior o número,
      mais suave/lenta será a rolagem.
    */
    const duration = 1100;

    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const easedProgress =
        easeInOutCubic(progress);

      window.scrollTo(
        0,
        start + distance * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };


  /* =========================================
     LINKS INTERNOS
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener('click', event => {

        const targetId =
          link.getAttribute('href');

        if (
          !targetId ||
          targetId === '#'
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        closeMenu();

        smoothScrollTo(target);

        /*
          Atualiza o endereço da página
          sem fazer o navegador pular
          diretamente para a seção.
        */
        history.pushState(
          null,
          '',
          targetId
        );
      });

    });
});
