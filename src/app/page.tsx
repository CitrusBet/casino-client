'use client'

import Header from '../components/Header'
import MobileHeader from '../components/MobileHeader'
import MobileNavigation from '../components/MobileNavigation'
import MobileSidebar from '../components/MobileSidebar'
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
    <div className="min-h-screen bg-[#1B1C2D] relative">
      <Sidebar />
      <MobileHeader />
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
      <div className="ml-0 md:ml-[74px] lg:ml-[74px] relative transition-all duration-300">
        <Hero />
        <Header />
        <MainContent />
      </div>
      <MobileNavigation onMenuClick={handleMenuClick} />
    </div>
  )
}
