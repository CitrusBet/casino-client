'use client'

import { Button } from '@heroui/react'

export default function MobileHeroSection() {
  const handleOpenRandom = () => {
    console.log('Opening random game...')
  }

  const handleMoreDetails = () => {
    console.log('Showing more details...')
  }

  return (
    <div className="lg:hidden px-[22px] pt-[135px] pb-8 text-left">
      <div className="text-[11px] uppercase text-[#7E7E7E] mb-3 font-medium tracking-wide">
        Lorem Ipsum is simply dummy text
      </div>
      
      <h1 className="text-white text-base font-bold leading-[19px] mb-4 max-w-[336px]">
        Lorem Ipsum is simply <br />
        dummy text of the printing and typesetting
      </h1>
      
      <div className="flex items-center gap-4 mb-6">
        <Button
          color="primary"
          className="bg-[#794DFD] text-white px-[18px] h-[37px] rounded-[20px] font-medium text-xs"
          onPress={handleOpenRandom}
        >
          Open random 🎰
        </Button>
        
        <Button
          variant="light"
          className="text-[#FFFBFF] font-medium text-xs px-4 py-2 rounded-[20px]"
          onPress={handleMoreDetails}
        >
          More details 🃏
        </Button>
      </div>
    </div>
  )
} 