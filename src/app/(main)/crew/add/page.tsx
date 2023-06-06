import CrewForm from '@/components/CrewForm'
import LargeHeading from '@/components/LargeHeading'

export default function AddCrewPage() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <LargeHeading size="sm">Add New Crew</LargeHeading>
      </div>
      <CrewForm />
    </>
  )
}
