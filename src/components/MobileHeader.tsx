'use client'

import { Button } from '@heroui/react'
import Image from 'next/image'

export default function MobileHeader() {
  const language = 'EN'

  return (
    <div className="lg:hidden block fixed top-0 left-0 right-0 h-[51px] backdrop-blur-[40px] z-30" style={{backgroundColor: 'rgba(19, 20, 32, 0.8)'}}>
      <div className="flex items-center justify-between h-full px-[22px]">
        <div className="flex items-center gap-1 text-white text-sm font-medium">
          <span>{language}</span>
          <Image 
            src="/images/arrow-down.svg" 
            alt="Arrow Down" 
            width={6} 
            height={3}
            className="stroke-[#FFFBFF]"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="bg-[#794DFD] text-white h-[30.8px] px-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px]"
          >
            Sign up 🚀
          </Button>
          
          <Button
            size="sm"
            className="bg-[#794DFD] text-white h-[30.8px] px-4 hover:bg-[#794DFD]/90 rounded-[20px] font-medium text-[10px]"
          >
            Login 🎉
          </Button>
        </div>
      </div>
    </div>
  )
} 