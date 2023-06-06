import ShipForm from '@/components/ShipForm'
import LargeHeading from '@/components/LargeHeading'

export default function AddShipPage() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <LargeHeading size="sm">Add New Ship</LargeHeading>
      </div>
      <ShipForm type="add" />
    </>
  )
}
