'use client';

import Script from 'next/script';
import { 
  Header, 
  Sidebar, 
  HeroSection, 
  Tabs, 
  GameSlider, 
  Providers 
} from '@components';

export default function Home() {
  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Swiper скрипт загружен');
          window.dispatchEvent(new Event('swiperLoaded'));
        }}
      />
      
      <Header />
      <Sidebar />
      
      <main className="main">
        <div className="container">
          <HeroSection />
          <Tabs />
          <div className="main__content">
            <div className="game__main">
              <div className="rows__game__main">
                <GameSlider 
                  title="Top games"
                  swiperId="top-games"
                  games={[1,2,3,4,5,6,7,8]}
                  prevButtonClass="swiper-button-prev-top"
                  nextButtonClass="swiper-button-next-top"
                />
                
                <GameSlider 
                  title="Table Games"
                  swiperId="table-games"
                  games={[9,11,12,13,14,15,16,17]}
                  prevButtonClass="swiper-button-prev-table"
                  nextButtonClass="swiper-button-next-table"
                />
                
                <GameSlider 
                  title="Slots"
                  swiperId="slots"
                  games={[18,19,20,21,22,23,24,25]}
                  prevButtonClass="swiper-button-prev-slots"
                  nextButtonClass="swiper-button-next-slots"
                />
              </div>
            </div>
            <Providers />
          </div>
        </div>
      </main>
    </>
  );
}
