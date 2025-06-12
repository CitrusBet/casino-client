'use client'

import Image from 'next/image'
import HeroSection from './HeroSection'

export default function Hero() {
  return (
    <div className="relative w-full min-h-[300px] lg:min-h-[320px] xl:min-h-[400px]">
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
      
      <div className="absolute left-5 lg:left-20 xl:left-[90px] top-20 lg:top-32 xl:top-[117px] z-10 right-5">
        <HeroSection />
      </div>
    </div>
  )
} 