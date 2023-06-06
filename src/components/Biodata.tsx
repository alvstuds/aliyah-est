import Image from 'next/image'
import { FC } from 'react'
import Paragraph from './Paragraph'

const Biodata: FC<any> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-5 border p-3">
      <div>
        <Paragraph>Given Name: {data.givenName}</Paragraph>
        <Paragraph>Sur Name: {data.surName}</Paragraph>
        <Paragraph>Place of Birth: {data.pob}</Paragraph>
        <Paragraph>
          Date of Birth: {new Date(data.dob!).toLocaleDateString()}
        </Paragraph>
      </div>
      <div>
        <div className="relative grid h-48 w-36">
          <Image
            src={data.imageUrl!}
            alt={data.givenName!}
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div>
        <Paragraph>ID Number: {data.idNumber}</Paragraph>
        <Paragraph>Home Address: {data.homeAddress}</Paragraph>
        <Paragraph>Marital Status: {data.maritalStatus}</Paragraph>
        <Paragraph>Religion: {data.religion}</Paragraph>
      </div>
      <div>
        <Paragraph>Next of Kin: {data.nextOfKin}</Paragraph>
        <Paragraph>Relation: {data.relation}</Paragraph>
        <Paragraph>Phone Number: {data.phoneNumber}</Paragraph>
        <Paragraph>Emergency Number: {data.emergencyNumber}</Paragraph>
      </div>
      <div>
        <Paragraph>Height: {data.height}</Paragraph>
        <Paragraph>Weight: {data.weight}</Paragraph>
        <Paragraph>Coverall: {data.coverall}</Paragraph>
        <Paragraph>Shoe Size: {data.shoeSize}</Paragraph>
      </div>
      <div>
        <Paragraph>mothersName: {data.mothersName}</Paragraph>
        <Paragraph>fathersName: {data.fathersName}</Paragraph>
      </div>
    </div>
  )
}

export default Biodata
