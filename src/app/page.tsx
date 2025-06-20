'use client'

import Header from '../components/Header'
import MobileHeader from '../components/MobileHeader'
import MobileNavigation from '../components/MobileNavigation'
import MobileSidebar from '../components/MobileSidebar'
import MobileGameTabs from '../components/MobileGameTabs'
import MobileGameSections from '../components/MobileGameSections'
import Hero from '../components/Hero'
import MainContent from '../components/MainContent'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleMenuClick = () => {
    setIsMobileSidebarOpen(true)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: '#1B1C2D',
        backgroundImage: 'url(/images/background-new.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      <div className="relative z-10">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <MobileHeader />
        
        <MobileSidebar 
          isOpen={isMobileSidebarOpen} 
          onClose={() => setIsMobileSidebarOpen(false)} 
        />
        
        <div className="ml-0 md:ml-[74px] lg:ml-[74px] relative transition-all duration-300">
          <Hero />
          
          <div className="lg:hidden">
            <MobileGameTabs />
            <MobileGameSections />
          </div>
          
          <div className="hidden lg:block">
            <Header />
            <MainContent />
          </div>
        </div>
        
        <MobileNavigation onMenuClick={handleMenuClick} />
      </div>
    </div>
  )
}
