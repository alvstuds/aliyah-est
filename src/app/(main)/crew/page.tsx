import CrewTable from '@/components/CrewTable'
import { buttonVariants } from '@/components/Button'
import LargeHeading from '@/components/LargeHeading'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function CrewPage() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="flex items-center justify-between">
        <LargeHeading size="sm">Crew Management</LargeHeading>
        {session?.user.role === 'admin' && (
          <Link
            href="/crew/add"
            className={buttonVariants({ variant: 'ghost' })}
          >
            <span className="hidden md:block">Add New Data</span>
            <PlusCircle className="md:ml-3" />
          </Link>
        )}
      </div>
      <CrewTable />
    </>
  )
}
