'use client'

import { Button } from '@heroui/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'

export default function MobileHeader() {
  const [language, setLanguage] = useState('EN')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
  ]

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setIsLanguageMenuOpen(false)
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
    <>
      <div className="lg:hidden block fixed top-0 left-0 right-0 h-[60px] sm:h-[51px] backdrop-blur-[40px] z-30 border-b border-white/5" style={{backgroundColor: 'rgba(19, 20, 32, 0.8)'}}>
        <div className="flex items-center justify-between h-full px-4 sm:px-[22px]">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div 
              className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer py-2" 
              style={{touchAction: 'manipulation'}}
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <span>{language}</span>
              <Image 
                src="/images/arrow-down.svg" 
                alt="Arrow Down" 
                width={6} 
                height={3}
                className={`stroke-[#FFFBFF] transition-transform duration-300 ease-in-out ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
              />
            </div>
            
            <div className={`absolute top-full mt-1 left-0 bg-[#131420]/95 backdrop-blur-md border border-[#794DFD]/30 rounded-[12px] py-2 w-[140px] shadow-lg z-[60] transition-all duration-300 ease-out ${
              isLanguageMenuOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#794DFD]/20 ${
                    language === lang.code 
                      ? 'text-[#794DFD] bg-[#794DFD]/10' 
                      : 'text-[#FFFBFF] hover:text-[#794DFD]'
                  }`}
                  style={{touchAction: 'manipulation'}}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              size="sm"
              className="bg-[#794DFD] text-white h-[30.8px] px-3 sm:px-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px]"
              style={{touchAction: 'manipulation'}}
              onClick={() => { setAuthMode('register'); setAuthModalOpen(true); }}
            >
              Sign up 🚀
            </Button>
            
            <Button
              size="sm"
              className="bg-[#794DFD] text-white h-[30.8px] px-3 sm:px-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px]"
              style={{touchAction: 'manipulation'}}
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
            >
              Login 🎉
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        switchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
    </>
  )
} 