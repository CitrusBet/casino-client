'use client'

import GameGrid from './GameGrid'
import ProvidersList from './ProvidersList'

export default function MainContent() {
  return (
    <div className="relative z-20 px-5 md:pl-20 lg:pl-[77px] md:pr-5 pt-8 md:pt-[112px] pb-20 md:pb-8">
      <div className="flex flex-col xl:flex-row gap-6 md:gap-[40px] max-w-full">
        <div className="flex-1 min-w-0 w-full">
          <GameGrid />
        </div>
        
        <div className="hidden xl:block w-full xl:w-[355px] flex-shrink-0">
          <ProvidersList />
        </div>
      </div>
    </div>
  )
} 