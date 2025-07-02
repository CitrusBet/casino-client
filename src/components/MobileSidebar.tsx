'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

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
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const menuItems: MenuItem[] = [
    { id: 'news', icon: '/images/readme-icon.svg', label: 'News' },
    { id: 'reviews', icon: '/images/boy-icon.svg', label: 'User reviews' },
    { id: 'complaints', icon: '/images/filters-icon.svg', label: 'Complaints' },
    { id: 'guide', icon: '/images/extension-add-icon.svg', label: 'Guide' },
    { id: 'bonuses', icon: '/images/gift-icon.svg', label: 'Bonuses' },
    { id: 'games', icon: '/images/dice-icon.svg', label: 'Games' },
    { id: 'casinos', icon: '/images/layout-pin-icon.svg', label: 'Online casinos', isActive: true },
  ]

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      setTimeout(() => setIsAnimating(false), 10)
    } else {
      setIsAnimating(true)
      document.body.style.overflow = ''
      document.body.style.height = ''
      setTimeout(() => {
        setIsVisible(false)
        setIsAnimating(false)
      }, 300)
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [isOpen])

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    console.log(`Clicked on ${itemId}`)
  }

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onClose()
    }, 50)
  }

  if (!isVisible) return null

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: 'rgba(19, 20, 32, 0.85)' }}
        onClick={handleClose}
      />
      
      <div 
        className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(27, 28, 45, 0.95) 0%, rgba(19, 20, 32, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '70vh',
          paddingBottom: '100px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="relative flex-shrink-0">
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-10 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollable-content">
          <div className="flex flex-col gap-3">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center gap-4 py-4 px-5 rounded-[16px] cursor-pointer transition-all duration-200 transform ${
                  activeItem === item.id
                    ? 'bg-[#794DFD]/20 scale-[1.02] shadow-lg shadow-[#794DFD]/20'
                    : 'hover:bg-white/5 hover:scale-[1.01] active:scale-[0.98]'
                }`}
                style={{
                  touchAction: 'manipulation',
                  animationDelay: `${index * 50}ms`,
                  animation: !isAnimating ? `slideInUp 0.3s ease-out forwards` : 'none'
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={24} 
                    height={24}
                    className="transition-all duration-200"
                    style={{
                      filter: activeItem === item.id 
                        ? 'brightness(0) saturate(100%) invert(37%) sepia(90%) saturate(4692%) hue-rotate(252deg) brightness(95%) contrast(103%)'
                        : 'brightness(0) invert(1) opacity(0.8)'
                    }}
                  />
                </div>
                <span className={`text-base font-medium transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'text-[#794DFD]'
                    : 'text-white/80 hover:text-white'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollable-content {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .scrollable-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
} 