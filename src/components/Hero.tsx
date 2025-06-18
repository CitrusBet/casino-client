'use client'

import Image from 'next/image'
import HeroSection from './HeroSection'

export default function Hero() {
  return (
    <div className="relative w-full min-h-[259px] md:min-h-[320px] lg:min-h-[400px]">
      <Image
        src="/images/casino-background.png"
        alt="Casino Banner"
        fill
        className="object-cover"
        style={{ objectPosition: 'center 40%' }}
        priority
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B1C2D]/50 via-transparent to-[#1B1C2D]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B1C2D]/30 via-transparent to-transparent" />
      
      <div className="absolute left-5 md:left-20 lg:left-[90px] top-[51px] md:top-32 lg:top-[117px] z-10 right-5">
        <HeroSection />
      </div>
    </div>
  )
} 