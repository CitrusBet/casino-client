'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useUser } from './UserContext'

export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { logout } = useUser()

  const balance = "0,00 ₽"

  const menuItems = [
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ), 
      label: 'Wallet' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ), 
      label: 'Transactions' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ), 
      label: 'Bet History' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ), 
      label: 'Affiliates' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ), 
      label: 'My Profile' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      ), 
      label: 'Log Out',
      action: logout
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Image 
          src="/images/ruble-icon.svg" 
          alt="Currency" 
          width={16} 
          height={16}
          className="text-white"
        />
        <span className="text-white font-medium text-sm">{balance}</span>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#794DFD] to-[#A855F7] p-[2px] hover:scale-105 transition-transform duration-200"
        >
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
            <Image 
              src="/images/profile.png" 
              alt="Profile" 
              width={32} 
              height={32}
              className="rounded-full"
            />
          </div>
        </button>

        <div className={`absolute top-full mt-2 right-0 bg-[#131420]/95 backdrop-blur-md border border-[#794DFD]/30 rounded-[16px] py-2 min-w-[200px] shadow-lg z-50 transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.action) {
                  item.action()
                }
                setIsMenuOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#794DFD]/20 text-[#FFFBFF] hover:text-[#794DFD] flex items-center gap-3"
            >
              <div className="text-[#7E7E7E]">
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 