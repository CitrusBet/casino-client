'use client';

import { useEffect } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import './GameSlider.css';

const GameSlider = ({ title, swiperId, games, prevButtonClass, nextButtonClass }) => {
  const { isMobile, isTablet } = useBreakpoint();
  useEffect(() => {
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        new window.Swiper(`.swiper-${swiperId}`, {
          slidesPerView: "auto",
          spaceBetween: 12,
          navigation: {
            prevEl: `.${prevButtonClass}`,
            nextEl: `.${nextButtonClass}`,
          },
          breakpoints: {
            480: {
              spaceBetween: 14,
              slidesPerView: "auto",
            },
            768: {
              spaceBetween: 16,
              slidesPerView: "auto",
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: "auto",
            },
            1280: {
              spaceBetween: 24,
              slidesPerView: "auto",
            },
            1440: {
              spaceBetween: 28,
              slidesPerView: "auto",
            },
            1920: {
              spaceBetween: 32,
              slidesPerView: "auto",
            },
          },
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          watchOverflow: true,
          centerInsufficientSlides: true,
          grabCursor: true,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: true,
          allowTouchMove: true,
        });
      }
    };

    setTimeout(initSwiper, 100);
  }, [swiperId, prevButtonClass, nextButtonClass]);

  return (
    <div className="rows__games" data-swiper-id={swiperId}>
      <div className="title__slide_arrow">
        <h2 className={title !== "Top games" ? "rows_games_marg" : ""}>{title}</h2>
        <div className="all__games_arrow__slide">
          <a href="#">Go to all {title}</a>
          {!isMobile && (
            <div className={title !== "Top games" ? "das" : ""}>
              <div className="arrow__slide">
                <div className={`custom-swiper-button-prev ${prevButtonClass}`}>
                  <img
                    src="/assets/icons/arrow_left.svg"
                    alt="arrow_left"
                    width="8"
                  />
                </div>
                <div className={`custom-swiper-button-next ${nextButtonClass}`}>
                  <img
                    src="/assets/icons/arrow_right.svg"
                    alt="arrow_right"
                    width="8"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`swiper swiper-${swiperId}`}>
        <div className="swiper-wrapper">
          {games.map(num => (
            <div key={num} className="swiper-slide game-card">
              <img
                src={`/assets/game_image/image_game_${num}.png`}
                alt="game"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSlider; 