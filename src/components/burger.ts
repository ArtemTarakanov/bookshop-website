export function initBurgerMenu() {
    const burger = document.querySelector('.header__burger') as HTMLElement;
    const nav = document.querySelector('.header__nav') as HTMLElement;
  
    burger.addEventListener('click', () => {
      burger.classList.toggle('header__burger--active');
      nav.classList.toggle('header__nav--active');
      document.body.classList.toggle('no-scroll');
    });
  }
  