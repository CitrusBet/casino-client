'use client'

import Image from 'next/image'

interface GameSectionProps {
  title: string
  imagePrefix: string
}

export default function MobileGameSections() {
  return (
    <div className="lg:hidden space-y-4 px-[22px] pb-20">
      <MobileGameSection title="Top game" imagePrefix="game" />
      <MobileGameSection title="Table Games" imagePrefix="table-game" />
      <MobileGameSection title="Slots" imagePrefix="slot-game" />
    </div>
  )
}

function MobileGameSection({ title, imagePrefix }: GameSectionProps) {
  const games = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: `/images/${imagePrefix}-${(index % 8) + 1}.png`
  }))

  return (
    <div className="bg-black/15 rounded-[10px] p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-sm font-normal">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-[25px] h-[25px] bg-[#2B2C3F] rounded-full flex items-center justify-center">
              <Image 
                src="/images/arrow-down.svg" 
                alt="Arrow" 
                width={3} 
                height={6}
                className="rotate-90 stroke-[#B09DFF]"
              />
            </div>
            <div className="w-[25px] h-[25px] bg-[#2B2C3F] rounded-full flex items-center justify-center">
              <Image 
                src="/images/arrow-down.svg" 
                alt="Arrow" 
                width={3} 
                height={6}
                className="-rotate-90 stroke-[#B09DFF]"
              />
            </div>
          </div>
          <span className="text-[#B09DFF] text-xs font-normal">
            All games
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-shrink-0 w-[83px] h-[136px] rounded-[10px] overflow-hidden"
          >
            <Image
              src={game.image}
              alt={`${title} Game ${game.id}`}
              width={83}
              height={136}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 