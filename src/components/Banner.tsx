import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banners/banner1.png';
import banner2 from '../assets/banners/banner2.png';
import banner3 from '../assets/banners/banner3.png';

const bannerSlides = [banner1, banner2, banner3];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(false);
    }, 500);
  };

  return (
    <section className="banner">
      <div className="banner__slider">
        <img 
          src={bannerSlides[currentSlide]} 
          alt={`Banner ${currentSlide + 1}`} 
          className={`banner__image ${fade ? 'fade' : ''}`}
        />
      </div>

      <a href="#" className="banner__card banner__card--purple">
        <div className="banner__card-text">
          CHANGE<br />
          OLD BOOK<br />
          ON NEW
        </div>
        <svg className="banner__card-arrow" width="57" height="14" viewBox="0 0 57 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7H54" stroke="#1C2A39" strokeWidth="2"/>
          <path d="M48 1L55 7L48 13" stroke="#1C2A39" strokeWidth="2"/>
        </svg>
      </a>

      <a href="#" className="banner__card banner__card--pink">
        <div className="banner__card-text">
          <span className="banner__line--top">TOP</span>
          <span className="banner__line--number">100</span>
          <span className="banner__line--books">BOOKS</span>
          <span className="banner__line--year">2022</span>
        </div>
        <svg className="banner__card-arrow" width="57" height="14" viewBox="0 0 57 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7H54" stroke="#1C2A39" strokeWidth="2"/>
          <path d="M48 1L55 7L48 13" stroke="#1C2A39" strokeWidth="2"/>
        </svg>
      </a>

      <div className="banner__dots">
        {bannerSlides.map((_, index) => (
          <span
            key={index}
            className={`banner__dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
