'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MenuItem {
  id: string
  icon: string
  label: string
  isActive?: boolean
}

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [activeItem, setActiveItem] = useState('casinos')

  const menuItems: MenuItem[] = [
    { id: 'news', icon: '/images/readme-icon.svg', label: 'News' },
    { id: 'reviews', icon: '/images/boy-icon.svg', label: 'User reviews' },
    { id: 'complaints', icon: '/images/filters-icon.svg', label: 'Complaints' },
    { id: 'guide', icon: '/images/extension-add-icon.svg', label: 'Guide' },
    { id: 'bonuses', icon: '/images/gift-icon.svg', label: 'Bonuses' },
    { id: 'games', icon: '/images/dice-icon.svg', label: 'Games' },
    { id: 'casinos', icon: '/images/layout-pin-icon.svg', label: 'Online casinos', isActive: true },
  ]

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    console.log(`Clicked on ${itemId}`)
  }

  if (!isOpen) return null

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(19, 20, 32, 0.85)' }}
        onClick={onClose}
      />
      
      <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm">
        <div className="p-[19px] pt-[86px]">
          <div className="flex flex-col gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center gap-4 py-3 px-4 rounded-[20px] cursor-pointer transition-all duration-200 ${
                  activeItem === item.id
                    ? 'bg-[#794DFD]/20 scale-105'
                    : 'hover:bg-[#27272F] hover:scale-105'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={20} 
                    height={20}
                    className={`transition-all duration-200 ${
                      activeItem === item.id
                        ? 'brightness-100 filter-none'
                        : 'brightness-75 filter grayscale hover:brightness-100'
                    }`}
                    style={{
                      filter: activeItem === item.id ? 'hue-rotate(270deg) saturate(1.5)' : undefined
                    }}
                  />
                </div>
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'text-[#794DFD]'
                    : 'text-[#BABABA] hover:text-white'
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