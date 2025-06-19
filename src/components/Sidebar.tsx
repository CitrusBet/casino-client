'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MenuItem {
  id: string
  icon: string
  label: string
  action?: () => void
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeItem, setActiveItem] = useState('')

  const mainMenuItems: MenuItem[] = [
    { id: 'home', icon: '/images/layout-pin-icon.svg', label: 'Home' },
    { id: 'games', icon: '/images/dice-icon.svg', label: 'Games' },
    { id: 'bonuses', icon: '/images/gift-icon.svg', label: 'Bonuses' },
    { id: 'tournaments', icon: '/images/extension-add-icon.svg', label: 'Tournaments' },
    { id: 'categories', icon: '/images/filters-icon.svg', label: 'Categories' },
    { id: 'profile', icon: '/images/boy-icon.svg', label: 'Profile' },
    { id: 'help', icon: '/images/readme-icon.svg', label: 'Help' },
    { id: 'settings', icon: '/images/settings-icon-1.svg', label: 'Settings' },
  ]

  const handleItemClick = (itemId: string) => {
    if (isExpanded) {
      setActiveItem(itemId)
    }
    console.log(`Clicked on ${itemId}`)
  }

  const handleMouseEnter = () => {
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    setIsExpanded(false)
    setActiveItem('')
  }

  return (
    <div 
      className={`hidden md:block fixed left-0 top-0 h-screen backdrop-blur-md flex flex-col items-start py-5 transition-all duration-300 ease-in-out z-50 overflow-y-auto scrollbar-hide ${
        isExpanded ? 'w-[200px]' : 'w-[74px]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: 'rgba(19, 20, 32, 0.85)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="w-full flex items-center px-[17px] mb-16">
        <div className="w-10 h-10 bg-[#794DFD] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium text-2xl">L</span>
        </div>
        <div className={`ml-4 text-white font-semibold text-lg transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          Casino
        </div>
      </div>
      
      <nav className="flex flex-col flex-1 w-full px-[17px]">
        <div className="flex flex-col gap-[20px] flex-1">
          {mainMenuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`group relative flex items-center h-[46px] rounded-lg cursor-pointer transition-all duration-200 ${
                isExpanded && activeItem === item.id 
                  ? 'bg-[#27272F] shadow-lg' 
                  : 'hover:bg-[#27272F] hover:scale-105'
              }`}
            >
              <div className="flex items-center justify-center w-[46px] h-[46px] flex-shrink-0">
                <Image 
                  src={item.icon} 
                  alt={item.label} 
                  width={20} 
                  height={20}
                  className="transition-all duration-200 brightness-75 group-hover:brightness-100"
                />
              </div>
              <div className={`ml-3 text-white font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              } text-[#7E7E7E] group-hover:text-white`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[20px] mt-8">
          <div
            onClick={() => handleItemClick('favorites')}
            className={`group relative flex items-center h-[46px] rounded-lg cursor-pointer transition-all duration-200 ${
              isExpanded && activeItem === 'favorites' 
                ? 'bg-[#27272F] shadow-lg' 
                : 'hover:bg-[#27272F] hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center w-[46px] h-[46px] flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M10 0L12.24 6.18L20 8L12.24 9.82L10 16L7.76 9.82L0 8L7.76 6.18L10 0Z" 
                  fill="#794DFD"
                  className="transition-all duration-200 group-hover:fill-white"
                />
              </svg>
            </div>
            <div className={`ml-3 text-white font-medium text-sm transition-all duration-300 whitespace-nowrap ${
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            } text-[#7E7E7E] group-hover:text-white`}>
              Favorites
            </div>
          </div>
        </div>
      </nav>
      
      <div className="w-full px-[17px] mt-8">
        <div
          onClick={() => handleItemClick('logout')}
          className="group relative flex items-center h-[46px] rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-600/20 hover:scale-105"
        >
          <div className="flex items-center justify-center w-[46px] h-[46px] flex-shrink-0">
            <Image 
              src="/images/log-off-icon.svg" 
              alt="Logout" 
              width={16} 
              height={18}
              className="transition-all duration-200 brightness-75 group-hover:brightness-100 group-hover:hue-rotate-180"
            />
          </div>
          <div className={`ml-3 text-red-400 font-medium text-sm transition-all duration-300 whitespace-nowrap group-hover:text-red-300 ${
            isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            Logout
          </div>
        </div>
      </div>
    </div>
  )
} 