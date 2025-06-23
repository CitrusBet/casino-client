'use client'

import { Button } from '@heroui/react'
import { useState, useCallback } from 'react'
import { LiaDiceSolid } from 'react-icons/lia'

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('New')
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const tabs = [
    { name: 'All games', active: true },
    { name: 'Slots', active: false },
    { name: 'Top rated', active: false },
    { name: 'Live', active: false },
    { name: 'New', active: false },
    { name: 'Recommendations', active: false },
  ]

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

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
    console.log(`Switched to ${tabName} tab`)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  return (
    <div className="relative z-10 py-8 mb-4">
      <div className="text-sm uppercase text-[#9F9F9F] mb-4 font-medium tracking-wide">
        Lorem Ipsum is simply dummy text
      </div>

      <h1 className="text-white text-[32px] font-bold leading-tight mb-6 max-w-[671px]">
        Lorem Ipsum is simply <br />
        dummy text of the printing and typesetting
      </h1>

      <div className="flex flex-row items-center gap-6 mb-8">
        <Button
          color="primary"
          size="lg"
          className={`bg-[#794DFD] text-white px-6 py-3 h-12 rounded-[20px] font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${clickedButton === 'openRandom'
              ? 'scale-95 bg-[#5A2FE8]'
              : 'hover:bg-[#6B42F0] hover:scale-105 hover:shadow-2xl hover:shadow-[#794DFD]/60'
            }`}
          onPress={() => handleButtonClick('openRandom', handleOpenRandom)}
        >
          <LiaDiceSolid className="w-4 h-4 mr-2" />
          <span className="relative z-10">Open random</span>
        </Button>

        <Button
          variant="light"
          className={`text-white pl-12 pr-6 py-3 h-12 rounded-[20px] font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${clickedButton === 'moreDetails'
              ? 'scale-95 bg-white/20 text-white'
              : 'hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg'
            }`}
          onPress={() => handleButtonClick('moreDetails', handleMoreDetails)}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 16v-4'%3E%3C/path%3E%3Cpath d='M12 8h.01'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '16px center',
            backgroundSize: '16px 16px'
          }}
        >
          <span className="relative z-10">More details</span>
        </Button>
      </div>

      <div className="flex flex-row items-center">
        <div className="flex flex-wrap items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`transition-all duration-300 ease-out ${tab.name == "All games" ? 'px-4' : 'px-3'} text-xs font-normal py-2 rounded-[20px] relative overflow-hidden group ${activeTab === tab.name
                  ? 'text-white bg-white/15 shadow-lg scale-105'
                  : 'text-[#FFFBFF] hover:text-white hover:bg-white/8 hover:scale-110'
                }`}
            >
              <span className="relative z-10 whitespace-nowrap">{tab.name}</span>
              {activeTab === tab.name && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#794DFD] to-[#6B42F0] rounded-[20px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#794DFD] to-[#6B42F0] rounded-[20px] animate-pulse"></div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 