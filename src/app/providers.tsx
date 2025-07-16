'use client'

import { HeroUIProvider } from '@heroui/react'
import { UserProvider } from '../components/UserContext'
import { CurrencyProvider } from '../components/CurrencyContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <CurrencyProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </CurrencyProvider>
    </HeroUIProvider>
  )
} 