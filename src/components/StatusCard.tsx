import LargeHeading from '@/components/LargeHeading'
import Paragraph from '@/components/Paragraph'
import Link from 'next/link'
import { FC } from 'react'

interface StatusCardType {
  data: {
    status: { name: string; value: string }
    value: number
  }
}

const StatusCard: FC<StatusCardType> = ({ data: { status, value } }) => {
  return (
    <Link href={`/crew?status=${status.value}`}>
      <div className="rounded border bg-slate-200 p-4 shadow-sm dark:bg-slate-700">
        <Paragraph className="font-light" size="sm">
          {status.name}
        </Paragraph>
        <div className="flex items-baseline justify-end gap-2">
          <LargeHeading>{value}</LargeHeading>
          <Paragraph className="font-light" size="sm">
            people
          </Paragraph>
        </div>
      </div>
    </Link>
  )
}

export default StatusCard
