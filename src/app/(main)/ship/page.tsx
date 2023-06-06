import ShipTable from '@/components/ShipTable'
import { buttonVariants } from '@/components/Button'
import LargeHeading from '@/components/LargeHeading'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function ShipPage() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="flex items-center justify-between">
        <LargeHeading size="sm">Ship Management</LargeHeading>
        {session?.user.role === 'admin' && (
          <Link
            href="/ship/add"
            className={buttonVariants({ variant: 'ghost' })}
          >
            <span className="hidden md:block">Add New Data</span>
            <PlusCircle className="md:ml-3" />
          </Link>
        )}
      </div>
      <ShipTable />
    </>
  )
}
