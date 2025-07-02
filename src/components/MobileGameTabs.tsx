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
    <div className="lg:hidden px-4 sm:px-[22px] py-4 max-xs:mt-5 mt-20-365">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-1" 
           style={{ WebkitOverflowScrolling: 'touch' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.name)}
            className={`flex items-center justify-center px-2 py-1 rounded-[20px] whitespace-nowrap text-xs font-normal transition-all duration-300 ease-out h-[29px] cursor-pointer relative overflow-hidden group ${
              activeTab === tab.name
                ? 'text-white bg-gradient-to-r from-[#794DFD] to-[#6B42F0] shadow-lg'
                : 'text-[#FFFBFF] hover:text-white hover:bg-white/8 hover:scale-105 active:scale-95'
            } ${tab.name === 'All games' ? 'min-w-[65px]' : ''} ${tab.name === 'Recommendations' ? 'recommendations-btn-small' : ''}`}
            style={{
              touchAction: 'manipulation', 
              pointerEvents: 'auto',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              minHeight: '29px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="relative z-10 whitespace-nowrap">{tab.name}</span>
            {activeTab === tab.name && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#794DFD] to-[#6B42F0] rounded-[20px] animate-pulse opacity-30 z-0"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 