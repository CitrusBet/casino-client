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
import { useState } from 'react'

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileSidebarOpen(true)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: '#1B1C2D',
        backgroundImage: 'url(/images/casino-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 z-0 backdrop-blur-xs bg-black/60 pointer-events-none" />
      
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
          <MobileGameTabs />
          <MobileGameSections />
          
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
