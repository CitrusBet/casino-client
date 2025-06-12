'use client';

import { useEffect, useRef, useState } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import './GameSlider.css';

const GameSlider = ({ title, swiperId, games, prevButtonClass, nextButtonClass }) => {
  const { isMobile, isTablet } = useBreakpoint();
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    const checkSwiperLoaded = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        setSwiperLoaded(true);
      }
    };

    checkSwiperLoaded();

    const handleSwiperLoad = () => {
      setSwiperLoaded(true);
    };

    window.addEventListener('swiperLoaded', handleSwiperLoad);

    return () => {
      window.removeEventListener('swiperLoaded', handleSwiperLoad);
    };
  }, []);

  useEffect(() => {
    if (!swiperLoaded) return;

    const initSwiper = () => {
      console.log(`Инициализация Swiper для ${swiperId}`);
      
      const swiperContainer = document.querySelector(`.swiper-${swiperId}`);
      const prevButton = document.querySelector(`.${prevButtonClass}`);
      const nextButton = document.querySelector(`.${nextButtonClass}`);
      
      console.log('Элементы найдены:', {
        container: !!swiperContainer,
        prevButton: !!prevButton,
        nextButton: !!nextButton
      });
      
      if (swiperContainer && prevButton && nextButton) {
        try {
          if (swiperRef.current && !swiperRef.current.destroyed) {
            swiperRef.current.destroy(true, true);
          }

          const swiper = new window.Swiper(swiperContainer, {
            slidesPerView: "auto",
            spaceBetween: 12,
            loop: true,
            loopFillGroupWithBlank: false,
            loopAdditionalSlides: 2,
            loopedSlides: Math.min(games.length, 3),
            navigation: {
              prevEl: prevButton,
              nextEl: nextButton,
              disabledClass: 'swiper-button-disabled',
              hiddenClass: 'swiper-button-hidden',
            },
            speed: 800,
            effect: 'slide',
            resistance: true,
            resistanceRatio: 0.85,
            roundLengths: true,
            preventInteractionOnTransition: true,
            allowSlideNext: true,
            allowSlidePrev: true,
            freeMode: false,
            freeModeSticky: false,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
              480: {
                spaceBetween: 14,
                slidesPerView: "auto",
                speed: 800,
              },
              768: {
                spaceBetween: 16,
                slidesPerView: "auto",
                speed: 800,
              },
              1024: {
                spaceBetween: 20,
                slidesPerView: "auto",
                speed: 800,
              },
              1280: {
                spaceBetween: 24,
                slidesPerView: "auto",
                speed: 800,
              },
              1440: {
                spaceBetween: 28,
                slidesPerView: "auto",
                speed: 800,
              },
              1920: {
                spaceBetween: 32,
                slidesPerView: "auto",
                speed: 800,
              },
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            watchOverflow: false,
            centerInsufficientSlides: true,
            grabCursor: true,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            allowTouchMove: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: false,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            on: {
              init: function() {
                console.log(`Swiper ${swiperId} успешно инициализирован с зацикливанием`);
              },
              slideChangeTransitionStart: function() {
                console.log(`${swiperId}: Начало перехода к слайду ${this.realIndex + 1}`);
              },
              slideChangeTransitionEnd: function() {
                console.log(`${swiperId}: Переход завершен, текущий слайд ${this.realIndex + 1} из ${games.length}`);
              }
            }
          });
          
          swiperRef.current = swiper;
          console.log(`Swiper ${swiperId} создан:`, swiper);
          
        } catch (error) {
          console.error(`Ошибка инициализации Swiper для ${swiperId}:`, error);
        }
      } else {
        console.warn(`Не удалось найти элементы для ${swiperId}:`, {
          swiperContainer: `.swiper-${swiperId}`,
          prevButton: `.${prevButtonClass}`,
          nextButton: `.${nextButtonClass}`
        });
      }
    };

    const timer = setTimeout(initSwiper, 100);
    
    return () => {
      clearTimeout(timer);
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, [swiperLoaded, swiperId, prevButtonClass, nextButtonClass]);

  return (
    <div className="rows__games" data-swiper-id={swiperId}>
      <div className="title__slide_arrow">
        <h2 className={title !== "Top games" ? "rows_games_marg" : ""}>{title}</h2>
        <div className="all__games_arrow__slide">
          <a href="#">Go to all {title}</a>
          {!isMobile && (
            <div className={title !== "Top games" ? "das" : ""}>
              <div className="arrow__slide">
                <button 
                  ref={prevButtonRef}
                  className={`custom-swiper-button-prev ${prevButtonClass}`}
                  type="button"
                  aria-label="Previous slide"
                >
                  <img
                    src="/assets/icons/arrow_left.svg"
                    alt="arrow_left"
                    width="8"
                  />
                </button>
                <button 
                  ref={nextButtonRef}
                  className={`custom-swiper-button-next ${nextButtonClass}`}
                  type="button"
                  aria-label="Next slide"
                >
                  <img
                    src="/assets/icons/arrow_right.svg"
                    alt="arrow_right"
                    width="8"
                  />
                </button>
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