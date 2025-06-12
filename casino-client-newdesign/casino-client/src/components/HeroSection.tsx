'use client'

import { Button } from '@heroui/react'
import { useState, useCallback } from 'react'

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('New')
  const [clickedButton, setClickedButton] = useState<string | null>(null)
  
  const tabs = [
    { name: 'Slots', active: false },
    { name: 'Top rated', active: false },
    { name: 'Live', active: false },
    { name: 'New', active: true },
    { name: 'Our recommendations', active: false },
  ]

  const handleButtonClick = useCallback((buttonName: string, action: () => void) => {
    setClickedButton(buttonName)
    setTimeout(() => setClickedButton(null), 200)
    action()
  }, [])

  const handleOpenRandom = () => {
    console.log('Opening random game...')
    // Добавить вибрацию если поддерживается
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

  const handleAllGames = () => {
    console.log('Opening all games...')
    if (navigator.vibrate) {
      navigator.vibrate(40)
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
      <div className="text-sm uppercase text-[#7E7E7E] mb-4 font-medium tracking-wide">
        Lorem Ipsum is simply dummy text
      </div>
      
      <h1 className="text-white text-[32px] font-bold leading-tight mb-6 max-w-[671px]">
        Lorem Ipsum is simply <br />
        dummy text of the printing and typesetting
      </h1>
      
      <div className="flex items-center gap-6">
        <Button
          color="primary"
          size="lg"
          className={`bg-[#794DFD] text-white px-6 py-3 h-12 rounded-[20px] font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden group ${
            clickedButton === 'openRandom' 
              ? 'scale-95 bg-[#5A2FE8]' 
              : 'hover:bg-[#6B42F0] hover:scale-105 hover:shadow-2xl hover:shadow-[#794DFD]/60'
          }`}
          onPress={() => handleButtonClick('openRandom', handleOpenRandom)}
        >
          <span className="relative z-10">Open random 🎰</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
        </Button>
        
        <Button
          variant="light"
          className={`text-[#FFFBFF] font-medium text-sm px-4 py-2 rounded-lg transition-all duration-300 ease-out relative overflow-hidden group ${
            clickedButton === 'moreDetails'
              ? 'scale-95 bg-white/20 text-white'
              : 'hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg'
          }`}
          onPress={() => handleButtonClick('moreDetails', handleMoreDetails)}
        >
          <span className="relative z-10">More details 🃏</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
        </Button>
      </div>
      
      <div className="flex items-center mt-8 max-w-[755px]">
        <Button
          color="primary"
          size="sm"
          className={`bg-[#794DFD] text-[#FDFDFD] px-4 h-9 rounded-[20px] font-normal text-xs transition-all duration-300 ease-out relative overflow-hidden group ${
            clickedButton === 'allGames'
              ? 'scale-95 bg-[#5A2FE8]'
              : 'hover:bg-[#6B42F0] hover:scale-105 hover:shadow-lg hover:shadow-[#794DFD]/50'
          }`}
          onPress={() => handleButtonClick('allGames', handleAllGames)}
        >
          <span className="relative z-10">All games</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
        </Button>
        
        <div className="flex items-center gap-6 ml-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`text-xs transition-all duration-300 ease-out px-3 py-2 rounded-lg relative overflow-hidden group ${
                activeTab === tab.name
                  ? 'text-white font-normal bg-white/15 shadow-lg scale-105' 
                  : 'text-[#FFFBFF] hover:text-white hover:bg-white/8 hover:scale-110'
              }`}
            >
              <span className="relative z-10">{tab.name}</span>
              {activeTab === tab.name && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#794DFD]/30 to-[#6B42F0]/30 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#794DFD]/20 to-[#6B42F0]/20 rounded-lg animate-pulse"></div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 