'use client'

import Image from 'next/image'
import { useState } from 'react'

interface NavigationItem {
  id: string
  icon: string
  label: string
  isActive?: boolean
}

interface MobileNavigationProps {
  onMenuClick?: () => void
}

export default function MobileNavigation({ onMenuClick }: MobileNavigationProps) {
  const [activeItem, setActiveItem] = useState('games')

  const navigationItems: NavigationItem[] = [
    { id: 'menu', icon: '/images/list-icon.svg', label: 'Menu' },
    { id: 'search', icon: '/images/search-icon.svg', label: 'Search' },
    { id: 'games', icon: '/images/dice-icon.svg', label: 'Game', isActive: true },
    { id: 'sport', icon: '/images/sport-icon.svg', label: 'Sport' },
    { id: 'chat', icon: '/images/chat-icon.svg', label: 'Chat' },
  ]

  const handleItemClick = (itemId: string) => {
    if (itemId === 'menu' && onMenuClick) {
      onMenuClick()
      return
    }
    setActiveItem(itemId)
    console.log(`Clicked on ${itemId}`)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[84px] backdrop-blur-[40px] z-30" style={{backgroundColor: 'rgba(19, 20, 32, 0.95)'}}>
      <div className="w-full h-full bg-gradient-to-t from-[#131420] to-transparent rounded-t-[20px]">
        <div className="flex items-center justify-center h-full px-[22px]">
          <div className="flex items-center justify-between w-full max-w-[348px]">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex flex-col items-center gap-[6px] cursor-pointer transition-all duration-200 ${
                  activeItem === item.id ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={24} 
                    height={24}
                    className={`transition-all duration-200 ${
                      activeItem === item.id
                        ? 'brightness-100 filter-none'
                        : 'brightness-75 filter grayscale hover:brightness-100 hover:filter-none'
                    }`}
                    style={{
                      filter: activeItem === item.id ? 'hue-rotate(270deg) saturate(1.5)' : undefined
                    }}
                  />
                </div>
                <span className={`text-[12px] font-medium leading-[15px] transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'text-[#794DFD]'
                    : 'text-white hover:text-[#794DFD]'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 