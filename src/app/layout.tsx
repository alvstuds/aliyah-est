import './globals.css'
import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/toast'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aliyah est',
  description:
    'Based on the system and the manpower, PT. Aliyah Est Indonesia provides the Total Ship Management Service with a good quality for all type of ships, such as passenger, Yacht, Chemical and oil tanker, Container, Bul Carrier, AHTS, AHT, Utility, Supply, Tug boat, Crew boat, Accommodation barge, etc.',
}

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50',
          inter.className
        )}
      >
        <Providers>
          <Toaster position="top-right" />
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
