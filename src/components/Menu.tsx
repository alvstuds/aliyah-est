'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './Button'
import { FC, PropsWithChildren } from 'react'
import { Inbox, LayoutDashboard, Ship, User, Users } from 'lucide-react'

const Menu = () => {
  return (
    <div className="mx-auto grid gap-3">
      <MenuItem href="/dashboard">
        <LayoutDashboard />
      </MenuItem>
      <MenuItem href="/ship">
        <Ship />
      </MenuItem>
      <MenuItem href="/crew">
        <Inbox />
      </MenuItem>
      <MenuItem href="/admin">
        <Users />
      </MenuItem>
      <MenuItem href="/me">
        <User />
      </MenuItem>
    </div>
  )
}

export default Menu

export const MenuItem: FC<PropsWithChildren & { href: string }> = (props) => {
  const pathname = usePathname()

  return (
    <Link
      href={props.href}
      className={buttonVariants({
        variant: pathname?.startsWith(props.href) ? 'default' : 'ghost',
        size: 'sm',
      })}
    >
      {props.children}
    </Link>
  )
}
