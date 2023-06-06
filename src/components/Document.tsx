import { FC } from 'react'
import Paragraph from './Paragraph'
import Link from 'next/link'

const Document: FC<any> = (props) => {
  const { item } = props

  return (
    <div className="grid grid-cols-2 border p-3">
      <div>
        <Paragraph>Type: {item.type}</Paragraph>
        <Paragraph>Number: {item.number}</Paragraph>
        <Paragraph>
          Issued: {new Date(item.issued!).toLocaleDateString()}
        </Paragraph>
        <Paragraph>
          Expired: {new Date(item.expired!).toLocaleDateString()}
        </Paragraph>
        <Paragraph>Place of Issued: {item.placeOfIssued}</Paragraph>
        <Paragraph>Name: {item.name}</Paragraph>
        <Paragraph>Sur Name: {item.surName}</Paragraph>
        <Paragraph>
          Document: <Link href={item.fileUrl}>link</Link>
        </Paragraph>
      </div>
      <div className="ml-auto space-x-1">{props.children}</div>
    </div>
  )
}

export default Document
