'use client';

import { useEffect } from 'react';
import './GameSlider.css';

const GameSlider = ({ title, swiperId, games, prevButtonClass, nextButtonClass }) => {
  useEffect(() => {
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        new window.Swiper(`.swiper-${swiperId}`, {
          slidesPerView: "auto",
          spaceBetween: 16,
          navigation: {
            prevEl: `.${prevButtonClass}`,
            nextEl: `.${nextButtonClass}`,
          },
          breakpoints: {
            768: {
              spaceBetween: 24,
            },
          },
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
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