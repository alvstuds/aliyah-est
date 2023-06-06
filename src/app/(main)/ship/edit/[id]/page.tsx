import ShipForm from '@/components/ShipForm'
import LargeHeading from '@/components/LargeHeading'
import { db } from '@/lib/db'

export default async function EditShipPage({ params }: any) {
  const ship = await db.ship
    .findFirst({ where: { id: params.id } })
    .then((data: any) => {
      const { createdAt, updatedAt, ...rest } = data
      return rest
    })

  return (
    <>
      <div className="flex items-baseline justify-between">
        <LargeHeading size="sm">Edit Ship</LargeHeading>
      </div>
      {ship && <ShipForm type="edit" ship={ship} />}
    </>
  )
}
