'use client'

import { useState } from 'react'

interface Tab {
  id: string
  name: string
  isActive?: boolean
}

export default function MobileGameTabs() {
  const [activeTab, setActiveTab] = useState('All games')

  const tabs: Tab[] = [
    { id: 'all-games', name: 'All games', isActive: true },
    { id: 'new', name: 'New', isActive: false },
    { id: 'recommendations', name: 'Recommendations', isActive: false },
    { id: 'live', name: 'Live', isActive: false },
    { id: 'top-rated', name: 'Top rated', isActive: false },
  ]

  const handleTabClick = (tabId: string, tabName: string) => {
    setActiveTab(tabName)
    console.log(`Switched to ${tabName} tab`)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  return (
    <div className="lg:hidden px-4 sm:px-[22px] py-4">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.name)}
            className={`flex items-center justify-center px-2 py-1 rounded-[20px] whitespace-nowrap text-xs font-normal transition-all duration-300 ease-out h-[29px] cursor-pointer ${
              activeTab === tab.name
                ? 'text-white bg-gradient-to-r from-[#794DFD] to-[#6B42F0] shadow-lg scale-105'
                : 'text-[#FFFBFF] hover:text-white hover:bg-white/8 hover:scale-110 active:scale-95'
            } ${tab.name === 'All games' ? 'min-w-[65px]' : ''}`}
            style={{touchAction: 'manipulation', pointerEvents: 'auto'}}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
} 