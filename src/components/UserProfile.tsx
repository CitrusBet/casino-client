'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useUser } from './UserContext'

export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBalanceMenuOpen, setIsBalanceMenuOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const balanceMenuRef = useRef<HTMLDivElement>(null)
  const { logout } = useUser()

  const currencies = [
    { 
      flag: (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex flex-col">
          <div className="h-1/3 bg-white"></div>
          <div className="h-1/3 bg-blue-600"></div>
          <div className="h-1/3 bg-red-600"></div>
        </div>
      ), 
      code: 'RUB', 
      symbol: '₽', 
      balance: '0,00' 
    },
    { 
      flag: (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex">
          <div className="w-1/2 bg-red-600"></div>
          <div className="w-1/2 flex flex-col">
            <div className="h-1/2 bg-white"></div>
            <div className="h-1/2 bg-blue-600"></div>
          </div>
        </div>
      ), 
      code: 'USD', 
      symbol: '$', 
      balance: '0.00' 
    },
    { 
      flag: (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex flex-col">
          <div className="h-1/3 bg-blue-600"></div>
          <div className="h-1/3 bg-yellow-400"></div>
          <div className="h-1/3 bg-blue-600"></div>
        </div>
      ), 
      code: 'EUR', 
      symbol: '€', 
      balance: '0.00' 
    },
    { 
      flag: (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex flex-col">
          <div className="h-1/2 bg-blue-600"></div>
          <div className="h-1/2 bg-yellow-400"></div>
        </div>
      ), 
      code: 'UAH', 
      symbol: '₴', 
      balance: '0.00' 
    },
    { 
      flag: (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex flex-col">
          <div className="h-1/2 bg-cyan-400"></div>
          <div className="h-1/2 bg-yellow-400"></div>
        </div>
      ), 
      code: 'KZT', 
      symbol: '₸', 
      balance: '0.00' 
    },
  ]

  const menuItems = [
    { 
      icon: (
        <Image 
          src="/images/balance-icon.png" 
          alt="Wallet" 
          width={16} 
          height={16}
        />
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
      if (balanceMenuRef.current && !balanceMenuRef.current.contains(event.target as Node)) {
        setIsBalanceMenuOpen(false)
      }
    }

    if (isMenuOpen || isBalanceMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, isBalanceMenuOpen])

  return (
    <div className="flex items-center gap-4">
      <div className="relative" ref={balanceMenuRef}>
        <button 
          onClick={() => setIsBalanceMenuOpen(!isBalanceMenuOpen)}
          className="flex items-center justify-between gap-6 px-5 py-2.5 bg-[rgba(37,43,67,0.7)] backdrop-blur-sm border border-[#3A3C5C] rounded-2xl hover:border-[#3A3C5C]/80 transition-all min-w-[220px]"
        >
          <div className="flex items-center gap-2">
            {currencies[selectedCurrency].flag}
            <span className="text-white font-medium text-sm">{currencies[selectedCurrency].balance} {currencies[selectedCurrency].symbol}</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className={`w-3 h-3 text-white/80 transition-transform duration-200 ${isBalanceMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="w-8 h-8 bg-[#794DFD] rounded-lg flex items-center justify-center">
              <Image 
                src="/images/balance-icon.png" 
                alt="Balance" 
                width={16} 
                height={16}
              />
            </div>
          </div>
        </button>

        <div className={`absolute top-full mt-2 left-0 bg-[#131420]/95 backdrop-blur-md border border-[#794DFD]/30 rounded-[16px] py-2 min-w-[220px] shadow-lg z-50 transition-all duration-300 ease-out ${
          isBalanceMenuOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}>
          {currencies.map((currency, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCurrency(index)
                setIsBalanceMenuOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#794DFD]/20 text-[#FFFBFF] hover:text-[#794DFD] flex items-center justify-between ${
                selectedCurrency === index ? 'bg-[#794DFD]/30 text-[#794DFD]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {currency.flag}
                <span className="leading-none">{currency.code}</span>
              </div>
              <span className="text-[#7E7E7E]">{currency.balance} {currency.symbol}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:scale-105 transition-transform duration-200"
        >
          <Image 
            src="/images/profile.png" 
            alt="Profile" 
            width={48} 
            height={48}
            className="rounded-full"
          />
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