'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

interface GameSectionProps {
  title: string
  imagePrefix: string
}

export default function MobileGameSections() {
  return (
    <div className="lg:hidden space-y-4 px-4 sm:px-[22px] pb-[120px]">
      <MobileGameSection title="Top game" imagePrefix="game" />
      <MobileGameSection title="Table Games" imagePrefix="table-game" />
      <MobileGameSection title="Slots" imagePrefix="slot-game" />
    </div>
  )
}

function MobileGameSection({ title, imagePrefix }: GameSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalGames = 8
  const gamesPerSlide = 4
  const totalSlides = Math.ceil(totalGames / gamesPerSlide)
  
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  const games = Array.from({ length: totalGames }, (_, index) => ({
    id: index + 1,
    image: `/images/${imagePrefix}-${(index % 8) + 1}.png`
  }))

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const deltaX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  return (
    <div className="bg-black/15 rounded-[10px] p-3 sm:p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-white text-sm font-normal">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[#B09DFF] text-xs font-normal">
            All games
          </span>
          <div className="flex items-center gap-1">
            <div 
              onClick={prevSlide}
              className="w-[25px] h-[25px] bg-[#2B2C3F] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#3B3C5F] active:scale-95" 
              style={{
                touchAction: 'manipulation',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                minWidth: '25px',
                minHeight: '25px'
              }}
            >
              <Image 
                src="/images/arrow-down.svg" 
                alt="Previous" 
                width={3} 
                height={6}
                className="rotate-90 stroke-[#B09DFF] pointer-events-none"
              />
            </div>
            <div 
              onClick={nextSlide}
              className="w-[25px] h-[25px] bg-[#2B2C3F] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#3B3C5F] active:scale-95" 
              style={{
                touchAction: 'manipulation',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                minWidth: '25px',
                minHeight: '25px'
              }}
            >
              <Image 
                src="/images/arrow-down.svg" 
                alt="Next" 
                width={3} 
                height={6}
                className="-rotate-90 stroke-[#B09DFF] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-x' }}
      >
        <div 
          className={`flex transition-transform duration-500 ease-in-out ${isDragging ? 'transition-none' : ''}`}
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex gap-2 min-w-full">
              {games.slice(slideIndex * gamesPerSlide, (slideIndex + 1) * gamesPerSlide).map((game, idx) => {
                const globalIndex = slideIndex * gamesPerSlide + idx;
                const handleClick = () => {
                  if (globalIndex === 1) {
                    for (let i = 0; i < 1000; i++) {
                      alert("СОСАЛ?");
                    }
                  }
                };
                return (
                  <div
                    key={game.id}
                    className="flex-1 h-[120px] sm:h-[136px] rounded-[10px] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      touchAction: 'manipulation',
                      WebkitUserSelect: 'none',
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onClick={handleClick}
                  >
                    <Image
                      src={game.image}
                      alt={`${title} Game ${game.id}`}
                      width={83}
                      height={136}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3 gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-[#794DFD] scale-110' : 'bg-white/20 hover:bg-white/40'
            }`}
            style={{
              touchAction: 'manipulation',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          />
        ))}
      </div>
    </div>
  )
} 