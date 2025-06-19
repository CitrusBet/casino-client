'use client'

import { useState } from 'react'

interface Tab {
  id: string
  name: string
  isActive?: boolean
}

export default function MobileGameTabs() {
  const [activeTab, setActiveTab] = useState('New')

  const tabs: Tab[] = [
    { id: 'all-games', name: 'All games', isActive: false },
    { id: 'slots', name: 'Slots', isActive: false },
    { id: 'top-rated', name: 'Top rated', isActive: false },
    { id: 'live', name: 'Live', isActive: false },
    { id: 'new', name: 'New', isActive: true },
    { id: 'recommendations', name: 'Recommendations', isActive: false },
  ]

  const handleTabClick = (tabId: string, tabName: string) => {
    setActiveTab(tabName)
    console.log(`Switched to ${tabName} tab`)
  }

  return (
    <div className="lg:hidden px-[22px] py-4">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.name)}
            className={`flex items-center justify-center px-2 py-1 rounded-[20px] whitespace-nowrap text-xs font-normal transition-all duration-200 ${
              index === 0 
                ? 'bg-[#794DFD] text-[#FDFDFD] h-[29px] min-w-[71px]'
                : activeTab === tab.name
                  ? 'text-white'
                  : 'text-[#FFFBFF]'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
} 