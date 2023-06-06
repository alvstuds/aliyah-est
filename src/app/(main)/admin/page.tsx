import AdminForm from '@/components/AdminForm'
import AdminTable from '@/components/AdminTable'
import LargeHeading from '@/components/LargeHeading'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="flex items-center justify-between">
        <LargeHeading size="sm">Admin Management</LargeHeading>
        <div>{session?.user.role === 'super-admin' && <AdminForm />}</div>
      </div>
      <AdminTable />
    </>
  )
}
