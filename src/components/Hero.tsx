'use client'

import HeroSection from './HeroSection'
import MobileHeroSection from './MobileHeroSection'

export default function Hero() {
  return (
    <div className="relative w-full min-h-[250px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[400px]">
      <div className="absolute left-0 top-[60px] sm:top-[51px] md:left-20 lg:left-[90px] md:top-32 lg:top-[100px] z-10 right-0 md:right-5">
        <MobileHeroSection />
        <div className="hidden lg:block pl-5 lg:pl-0">
          <HeroSection />
        </div>
      </div>
    </div>
  )
} 