'use client'
import BarChart from '@/components/BarChart'
import StatusCard from '@/components/StatusCard'
import LargeHeading from '@/components/LargeHeading'
import useDashboard from '@/hooks/useDashboard'

export default function DashboardPage() {
  const { data, loading } = useDashboard()

  return (
    <div className="space-y-10 pb-96">
      <div className="grid gap-4 lg:grid-cols-4">
        {loading ? (
          <div>loading...</div>
        ) : (
          data.crewStatus.map((data: any) => (
            <StatusCard key={data.status.value} data={data} />
          ))
        )}
      </div>
      {/* Diagrams */}
      <div>
        {loading ? (
          <div></div>
        ) : (
          <div className="mb-20 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <LargeHeading size="sm">Crew Status Diagram</LargeHeading>
              <BarChart
                data={{
                  labels: data.crewStatus.map((item: any) => item.status.name),
                  datasets: [
                    {
                      label: 'total',
                      data: data.crewStatus.map((item: any) => item.value),
                    },
                  ],
                }}
              />
            </div>
            <div className="max-h-96 space-y-6">
              <LargeHeading size="sm">Total Ship</LargeHeading>
              <div className="mx-auto">
                <LargeHeading>{data?.shipData.length}</LargeHeading>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {loading ? (
          <div></div>
        ) : (
          <>
            <LargeHeading size="sm">Main Rank Diagram</LargeHeading>
            <div className="mx-auto">
              <BarChart
                data={{
                  labels: data.crewMainRank.map(
                    (item: any) => item.mainRank.name
                  ),
                  datasets: [
                    {
                      label: 'total',
                      data: data.crewMainRank.map((item: any) => item.value),
                    },
                  ],
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
