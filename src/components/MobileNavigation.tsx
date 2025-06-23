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
  onMenuClose?: () => void
}

export default function MobileNavigation({ onMenuClick, onMenuClose }: MobileNavigationProps) {
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
      setActiveItem('menu')
      onMenuClick()
      return
    }
    if (itemId !== 'menu' && onMenuClose) {
      onMenuClose()
    }
    setActiveItem(itemId)
    console.log(`Clicked on ${itemId}`)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[84px] backdrop-blur-[40px] z-[60] border-t border-white/5" style={{backgroundColor: 'rgba(19, 20, 32, 0.95)'}}>
      <div className="w-full h-full bg-gradient-to-t from-[#131420] to-transparent rounded-t-[20px]">
        <div className="flex items-center justify-center h-full px-4">
          <div className="flex items-center justify-between w-full max-w-[348px] mx-auto">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex flex-col items-center gap-[6px] cursor-pointer transition-all duration-200 min-w-[50px] py-2 px-1 rounded-lg active:scale-95 ${
                  activeItem === item.id ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{
                  touchAction: 'manipulation',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={24} 
                    height={24}
                    className="transition-all duration-200 pointer-events-none"
                    style={{
                      filter: activeItem === item.id 
                        ? 'brightness(0) saturate(100%) invert(37%) sepia(90%) saturate(4692%) hue-rotate(252deg) brightness(95%) contrast(103%)'
                        : 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <span className={`text-[12px] font-medium leading-[15px] transition-colors duration-200 text-center pointer-events-none ${
                  activeItem === item.id
                    ? 'text-[#794DFD]'
                    : 'text-white'
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