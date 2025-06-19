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
      className="min-h-screen relative"
      style={{
        backgroundColor: '#1B1C2D',
        backgroundImage: 'url(/images/casino-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient overlays for better readability */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(27, 28, 45, 0.2) 0%, rgba(27, 28, 45, 0) 30%),
            linear-gradient(0deg, rgba(27, 28, 45, 0.4) 0%, rgba(27, 28, 45, 0) 50%)
          `,
          zIndex: 0
        }}
      />
      
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
