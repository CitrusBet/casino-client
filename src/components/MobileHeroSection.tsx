'use client'

import { Button } from '@heroui/react'
import { useState, useCallback } from 'react'

export default function MobileHeroSection() {
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const handleButtonClick = useCallback((buttonName: string, action: () => void) => {
    setClickedButton(buttonName)
    setTimeout(() => setClickedButton(null), 200)
    action()
  }, [])

  const handleOpenRandom = () => {
    console.log('Opening random game...')
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleMoreDetails = () => {
    console.log('Showing more details...')
    if (navigator.vibrate) {
      navigator.vibrate(30)
    }
  }

  return (
    <div className="lg:hidden px-4 sm:px-[22px] pt-[75px] sm:pt-[80px] md:pt-[95px] pb-4 sm:pb-6 text-left">
      <div className="text-[11px] uppercase text-[#7E7E7E] mb-3 font-medium tracking-wide">
        Lorem Ipsum is simply dummy text
      </div>
      
      <h1 className="text-white text-base font-bold leading-[19px] mb-4 max-w-[336px]">
        Lorem Ipsum is simply <br />
        dummy text of the printing and typesetting
      </h1>
      
      <div className="flex items-center gap-4 mb-4">
        <Button
          color="primary"
          className={`bg-[#794DFD] text-white px-[18px] h-[37px] rounded-[20px] font-medium text-xs transition-all duration-300 ease-out relative overflow-hidden group ${
            clickedButton === 'openRandom'
              ? 'scale-95 bg-[#5A2FE8]'
              : 'hover:bg-[#6B42F0] hover:scale-105 hover:shadow-2xl hover:shadow-[#794DFD]/60 active:scale-95 active:bg-[#5A2FE8]'
          }`}
          onPress={() => handleButtonClick('openRandom', handleOpenRandom)}
          style={{touchAction: 'manipulation'}}
        >
          <span className="relative z-10">Open random 🎰</span>
        </Button>
        
        <Button
          variant="light"
          className={`text-[#FFFBFF] font-medium text-xs px-0 py-0 h-auto min-w-0 bg-transparent transition-all duration-300 ease-out relative overflow-hidden group ${
            clickedButton === 'moreDetails'
              ? 'scale-95 bg-white/20 text-white'
              : 'hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg active:scale-95 active:bg-white/20'
          }`}
          onPress={() => handleButtonClick('moreDetails', handleMoreDetails)}
          style={{touchAction: 'manipulation'}}
        >
          <span className="relative z-10">More details 🃏</span>
        </Button>
      </div>
    </div>
  )
} 