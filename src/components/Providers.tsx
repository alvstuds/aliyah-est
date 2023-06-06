'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { FC, PropsWithChildren } from 'react'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
