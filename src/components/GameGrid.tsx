'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function GameGrid() {
  return (
    <div className="pt-4 space-y-6 md:space-y-8">
      <GameSection title="Top game" imagePrefix="game" />
      <GameSection title="Table Games" imagePrefix="table-game" />
      <GameSection title="Slots" imagePrefix="slot-game" />
    </div>
  )
}

function GameSection({ title, imagePrefix }: { title: string, imagePrefix: string }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const getGamesPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2
      if (window.innerWidth < 768) return 3
      if (window.innerWidth < 1024) return 4
      return 8
    }
    return 8
  }
  
  const [gamesPerSlide, setGamesPerSlide] = useState(getGamesPerSlide())
  
  useEffect(() => {
    const handleResize = () => {
      setGamesPerSlide(getGamesPerSlide())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const totalGames = 24
  const totalSlides = Math.ceil(totalGames / gamesPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="bg-black/20 rounded-[20px] p-3 md:p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-white text-sm font-normal">{title}</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevSlide}
            className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 text-[#B09DFF]" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-3 h-3 text-[#B09DFF]" />
          </button>
          <span className="text-[#B09DFF] text-xs hover:text-white transition-colors cursor-pointer hidden md:inline">
            Go to all {title} games
          </span>
          <span className="text-[#B09DFF] text-xs hover:text-white transition-colors cursor-pointer md:hidden">
            All games
          </span>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex gap-2 min-w-full">
              {Array.from({ length: gamesPerSlide }).map((_, gameIndex) => {
                const imageIndex = (gameIndex % 8) + 1
                
                return (
                  <div
                    key={gameIndex}
                    className="flex-1 aspect-[83/136] md:aspect-[128/211] rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={`/images/${imagePrefix}-${imageIndex}.png`}
                      alt={`${title} Game ${imageIndex}`}
                      width={256}
                      height={422}
                      quality={95}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-3 md:mt-4 gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-[#794DFD]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 