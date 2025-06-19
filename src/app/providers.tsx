'use client'

import { HeroUIProvider } from '@heroui/react'
import { UserProvider } from '../components/UserContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </HeroUIProvider>
  )
} 