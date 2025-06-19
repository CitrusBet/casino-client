'use client'

import { Button } from '@heroui/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [language, setLanguage] = useState('EN')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
  ]

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setIsLanguageMenuOpen(false)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`)
      if (navigator.vibrate) {
        navigator.vibrate(30)
      }
    } else {
      console.log('Please enter a search query')
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsLanguageMenuOpen(false)
    }

    if (isLanguageMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  return (
    <div className="fixed top-0 left-0 md:left-[74px] lg:left-[74px] right-0 h-20 backdrop-blur-md z-30 md:block hidden" style={{backgroundColor: 'rgba(19, 20, 32, 0.85)'}}>
      <div className="flex items-center justify-between h-full px-5">
        <div className="flex-1 max-w-[778px] ml-5">
          <form onSubmit={handleSearchSubmit} className="relative w-full h-12 flex items-center">
            <button
              type="submit"
              className="w-16 h-12 bg-[#794DFD] rounded-[20px] flex items-center justify-center group relative overflow-hidden transition-all duration-300 ease-out hover:bg-[#6B42F0] hover:scale-105 hover:shadow-lg hover:shadow-[#794DFD]/50 active:scale-95"
              onClick={handleSearch}
            >
              <Image 
                src="/images/search-icon.svg" 
                alt="Search" 
                width={20} 
                height={20} 
                className="text-white relative z-10 transition-transform duration-200 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </button>
            <input
              type="text"
              placeholder="Search for casinos, games and more..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`flex-1 bg-transparent text-white placeholder:text-[#7E7E7E] text-sm font-medium outline-none ml-5 transition-all duration-300 ease-out ${
                isSearchFocused 
                  ? 'transform scale-105 text-[#FFFBFF]' 
                  : 'hover:text-[#FFFBFF]'
              }`}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="bordered"
              size="md"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="border-[#794DFD] text-[#FFFBFF] bg-transparent h-12 px-6 hover:bg-[#794DFD]/20 rounded-[20px] font-medium text-sm flex items-center gap-2"
            >
              {language}
              <Image 
                src="/images/arrow-down.svg" 
                alt="Arrow Down" 
                width={6} 
                height={3}
                className={`transition-transform duration-300 ease-in-out ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>
            
            <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#131420]/95 backdrop-blur-md border border-[#794DFD]/30 rounded-[16px] py-2 min-w-[120px] shadow-lg z-50 transition-all duration-300 ease-out ${
              isLanguageMenuOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:bg-[#794DFD]/20 ${
                    language === lang.code 
                      ? 'text-[#794DFD] bg-[#794DFD]/10' 
                      : 'text-[#FFFBFF] hover:text-[#794DFD]'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          <Button
            size="md"
            className="bg-[#794DFD] text-white h-12 px-6 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-sm"
          >
            Login 🎉
          </Button>
          
          <Button
            size="md"
            className="bg-[#794DFD] text-white h-12 px-6 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-sm"
          >
            Sign up 🚀
          </Button>
        </div>
      </div>
    </div>
  )
} 