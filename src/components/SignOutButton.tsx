'use client'
import useStore from '@/store/useStore'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { FC, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './Button'

const SignOutButton: FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const { logout } = useStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="flex gap-3">
      {isHomePage && (
        <Button
          onClick={() => router.push('/dashboard')}
          size="sm"
          variant="link"
        >
          <span className="hidden md:block">Dashboard</span>

          <span className="md:hidden">
            <LayoutDashboard className="h-4 w-4" />
          </span>
        </Button>
      )}
      <Button
        onClick={() => logout(setIsLoading)}
        isLoading={isLoading}
        size="sm"
      >
        <span className="hidden md:block">Sign out</span>

        <span className="md:hidden">
          <LogOut className="h-4 w-4" />
        </span>
      </Button>
    </div>
  )
}

export default SignOutButton
