'use client'

import { Button } from '@heroui/react'
import Image from 'next/image'

export default function ProvidersList() {
  const providers = [
    { name: 'Evolution Gaming', logo: '/images/provider-evolution.png' },
    { name: 'Pragmatic Play', logo: '/images/provider-pragmatic.png' }, 
    { name: 'Hacksaw', logo: '/images/provider-hacksaw.png' },
    { name: 'NoLimitCity', logo: '/images/provider-nolimit.png' },
    { name: 'NetEnt', logo: '/images/provider-netent.png' },
    { name: 'BetSoft', logo: '/images/provider-betsoft.png' }
  ]

  return (
    <div className="bg-content1 rounded-[20px] w-[355px] h-[394px] shadow-lg">
      <div className="pt-[33px] px-[20px] pb-[32px]">
        <h3 className="text-white text-[18px] font-bold leading-[1.21]">Providers</h3>
      </div>
      
      <div className="px-[20px] space-y-[12px]">
        {providers.map((provider) => (
          <div key={provider.name} className="bg-transparent h-[42px] flex items-center justify-between hover:bg-white/5 transition-colors rounded-[10px] px-0">
            <div className="flex items-center gap-[12px]">
              <div className="w-[80px] h-[32px] bg-content1 rounded-[10px] flex items-center justify-center overflow-hidden">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={80}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-medium text-[14px] leading-[1.21]">{provider.name}</span>
            </div>
            
            <div className="w-[78px] h-[42px] flex items-center justify-center">
              <Button
                color="primary"
                className="bg-[#794DFD] text-white w-[78px] h-[42px] rounded-[20px] font-normal text-[12px] leading-[1.21] min-w-0 hover:bg-[#794DFD]/90 transition-colors"
                onPress={() => {
                  console.log(`Opening ${provider.name}`)
                }}
              >
                Open
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 