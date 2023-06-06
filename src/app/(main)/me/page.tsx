import ProfileForm from '@/components/ProfileForm'
import LargeHeading from '@/components/LargeHeading'
import Paragraph from '@/components/Paragraph'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) return notFound()

  const data = await db.user.findFirst({ where: { id: session.user.id } })

  return (
    <>
      <div className="flex gap-3">
        <LargeHeading size="sm">Profile</LargeHeading>
        <ProfileForm data={data!} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {data?.avatarUrl && (
          <div className="relative h-32 w-24 md:order-2">
            <Image
              src={data.avatarUrl}
              alt={data?.name!}
              className="object-cover"
              fill
            />
          </div>
        )}
        <div>
          <Paragraph>
            ID : <span>{data?.id}</span>
          </Paragraph>
          <Paragraph>
            NAME : <span>{data?.name}</span>
          </Paragraph>
          <Paragraph>
            EMAIL : <span>{data?.email}</span>
          </Paragraph>
          <Paragraph>
            PHONE NUMBER : <span>{data?.phoneNumber ?? '...'}</span>
          </Paragraph>
        </div>
      </div>
    </>
  )
}
