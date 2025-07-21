import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

const bannerSlides = [banner1, banner2, banner3];
let bannerCurrentSlide = 0;

const bannerImage = document.querySelector<HTMLImageElement>('.banner__image');
const bannerDots = document.querySelectorAll<HTMLSpanElement>('.banner__dot');

function updateBannerSlide(index: number) {
  if (!bannerImage) return;
  bannerImage.classList.add('fade');
  bannerImage.src = bannerSlides[index];

  bannerDots.forEach(dot => dot.classList.remove('active'));
  bannerDots[index].classList.add('active');

  setTimeout(() => {
    bannerImage.classList.remove('fade');
  }, 500);
}

function nextBannerSlide() {
  bannerCurrentSlide = (bannerCurrentSlide + 1) % bannerSlides.length;
  updateBannerSlide(bannerCurrentSlide);
}

function initSlider() {
  updateBannerSlide(bannerCurrentSlide);
  let bannerSlideInterval = setInterval(nextBannerSlide, 5000);

  bannerDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      bannerCurrentSlide = index;
      updateBannerSlide(bannerCurrentSlide);
      clearInterval(bannerSlideInterval);
      bannerSlideInterval = setInterval(nextBannerSlide, 5000);
    });
  });
}

export { initSlider };
