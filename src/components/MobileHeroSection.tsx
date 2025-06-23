'use client'

import { Button } from '@heroui/react'
import { useState, useCallback } from 'react'
import { LiaDiceSolid } from 'react-icons/lia'

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
    <div 
      className="lg:hidden px-4 sm:px-[22px] pt-[75px] sm:pt-[80px] md:pt-[95px] pb-4 sm:pb-6 text-left relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/background-new.png)'
      }}
    >
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
          style={{
            touchAction: 'manipulation',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <LiaDiceSolid className="w-3.5 h-3.5 mr-1.5" />
          <span className="relative z-10">Open random</span>
        </Button>
        
        <Button
          variant="light"
          className={`text-white pl-8 pr-3 h-[37px] rounded-[20px] font-medium text-xs transition-all duration-300 ease-out relative overflow-hidden group min-w-0 bg-transparent ${
            clickedButton === 'moreDetails'
              ? 'scale-95 bg-white/20 text-white shadow-lg'
              : 'hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20 active:scale-95 active:bg-white/20'
          }`}
          onPress={() => handleButtonClick('moreDetails', handleMoreDetails)}
          style={{
            touchAction: 'manipulation',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '8px center',
            backgroundSize: '14px 14px'
          }}
        >
          <span className="relative z-10 whitespace-nowrap">More details</span>
        </Button>
      </div>
    </div>
  )
} 