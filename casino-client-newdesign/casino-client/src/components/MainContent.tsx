'use client'

import GameGrid from './GameGrid'
import ProvidersList from './ProvidersList'

export default function MainContent() {
  return (
    <div className="relative z-20 pl-5 lg:pl-20 xl:pl-[77px] pr-5 pt-[32px] pb-8">
      <div className="flex flex-col xl:flex-row gap-[40px] max-w-full">
        <div className="flex-1 min-w-0 w-full">
          <GameGrid />
        </div>
        
        <div className="w-full xl:w-[355px] flex-shrink-0">
          <ProvidersList />
        </div>
      </div>
    </div>
  )
} 