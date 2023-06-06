import Biodata from '@/components/Biodata'
import CreateDoc from '@/components/CrewForm/CreateDoc'
import DeleteDoc from '@/components/CrewForm/DeleteDoc'
import EditBiodata from '@/components/CrewForm/EditBiodata'
import EditPositionSub from '@/components/CrewForm/EditPositionSub'
import EditSeamanBook from '@/components/CrewForm/EditSeamanBook'
import EditTravelDoc from '@/components/CrewForm/EditTravelDoc'
import Document from '@/components/Document'
import LargeHeading from '@/components/LargeHeading'
import Paragraph from '@/components/Paragraph'
import { authOptions } from '@/lib/auth'
import { mainRankOpts, pvOpts, skillsOpts } from '@/lib/data'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function DetailCrewPage(props: {
  params: { crewId: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) return notFound()
  const isAdmin = session.user.role === 'admin'

  const { data, tdData, sbData } = await getData(props.params.crewId)

  return (
    <>
      {/* biodata */}
      <div className="flex items-center">
        <LargeHeading>Biodata</LargeHeading>
        {isAdmin && <EditBiodata data={data} />}
      </div>
      <Biodata data={data} />

      {/* position submission */}
      <div className="flex items-center">
        <LargeHeading>Position Submission</LargeHeading>
        {isAdmin && <EditPositionSub data={data} />}
      </div>
      <div className="border p-3">
        <Paragraph>
          Main Rank:{' '}
          {mainRankOpts.find((item) => item.value === data.mainRank)?.name}
        </Paragraph>
        <Paragraph>
          Previous Vessel Type:{' '}
          {pvOpts.find((item) => item.value === data.prevVesselType)?.name}
        </Paragraph>
        <Paragraph>
          English Skills:{' '}
          {skillsOpts.find((item) => item.value === data.englishSkills)?.name}
        </Paragraph>
      </div>

      {/* travel document */}
      <div className="flex items-center gap-3">
        <LargeHeading>Travel Document</LargeHeading>
        {isAdmin && <CreateDoc type="td" crewId={data.id} />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tdData?.map((item: any) => (
          <Document item={item} key={item.id}>
            {isAdmin && (
              <>
                <EditTravelDoc data={item} />
                <DeleteDoc id={item.id} type="td" />
              </>
            )}
          </Document>
        ))}
      </div>

      {/* seaman book */}
      <div className="flex items-center gap-3">
        <LargeHeading>Seaman Book</LargeHeading>
        {isAdmin && <CreateDoc type="sb" crewId={data.id} />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {sbData?.map((item: any) => (
          <Document item={item} key={item.id}>
            {isAdmin && (
              <>
                <EditSeamanBook data={item} />
                <DeleteDoc id={item.id} type="sb" />
              </>
            )}
          </Document>
        ))}
      </div>
    </>
  )
}

const getData = async (crewId: string) => {
  const data = await db.crew
    .findFirst({ where: { id: crewId } })
    .then((data: any) => {
      const { createdAt, updatedAt, ...rest } = data
      rest.dob = rest.dob.toString()
      return rest
    })

  if (!data) return notFound()

  const tdData = await db.travelDocument
    .findMany({ where: { crewId } })
    .then((data: any) =>
      data.map((item: any) => {
        const { createdAt, updatedAt, ...rest } = item
        rest.issued = item.issued.toString()
        rest.expired = item.issued.toString()
        return rest
      })
    )

  const sbData = await db.seamanBook
    .findMany({ where: { crewId } })
    .then((data: any) =>
      data.map((item: any) => {
        const { createdAt, updatedAt, ...rest } = item
        rest.issued = item.issued.toString()
        rest.expired = item.issued.toString()
        return rest
      })
    )

  return { data, tdData, sbData }
}
