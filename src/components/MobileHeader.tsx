'use client'

import { Button } from '@heroui/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'
import MobileUserProfile from './MobileUserProfile'
import { useUser } from './UserContext'

export default function MobileHeader() {
  const [language, setLanguage] = useState('EN')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { isAuthenticated } = useUser()

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
  ]

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setIsLanguageMenuOpen(false)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
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
              className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer py-2 px-1 rounded-lg hover:bg-white/5 active:scale-95 transition-all duration-200" 
              style={{
                touchAction: 'manipulation',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '32px'
              }}
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <span className="pointer-events-none">{language}</span>
              <Image 
                src="/images/arrow-down.svg" 
                alt="Arrow Down" 
                width={6} 
                height={3}
                className={`stroke-[#FFFBFF] transition-transform duration-300 ease-in-out pointer-events-none ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
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
                  className={`w-full px-3 py-2 text-left text-sm font-medium transition-all duration-200 hover:bg-[#794DFD]/20 active:scale-95 ${
                    language === lang.code 
                      ? 'text-[#794DFD] bg-[#794DFD]/10' 
                      : 'text-[#FFFBFF] hover:text-[#794DFD]'
                  }`}
                  style={{
                    touchAction: 'manipulation',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <MobileUserProfile />
            ) : (
              <>
                <Button
                  size="sm"
                  className="bg-[#794DFD] text-white h-[30.8px] pl-7 pr-3 sm:pr-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px] transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    touchAction: 'manipulation',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='8.5' cy='7' r='4'%3E%3C/circle%3E%3Cline x1='20' y1='8' x2='20' y2='14'%3E%3C/line%3E%3Cline x1='23' y1='11' x2='17' y2='11'%3E%3C/line%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '8px center',
                    backgroundSize: '12px 12px'
                  }}
                  onClick={() => { setAuthMode('register'); setAuthModalOpen(true); }}
                >
                  Sign up
                </Button>
                
                <Button
                  size="sm"
                  className="bg-[#794DFD] text-white h-[30.8px] pl-7 pr-3 sm:pr-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px] transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    touchAction: 'manipulation',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '8px center',
                    backgroundSize: '12px 12px'
                  }}
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                >
                  Login
                </Button>
              </>
            )}
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