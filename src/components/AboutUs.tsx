import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import LargeHeading from './LargeHeading'
import Paragraph from './Paragraph'

const AboutUs: FC = () => {
  return (
    <>
      <div className="grid items-center gap-4 md:h-96 md:grid-cols-2 md:gap-0">
        <div className="relative h-40 md:h-72 md:w-10/12">
          <Image
            src="/about-img.png"
            alt="about-img"
            className="rounded object-cover"
            fill
          />
          <div className="absolute inset-0 rounded bg-black/25"></div>
        </div>
        <div className="text-justify">
          <Paragraph>
            <span className="text-xl font-bold">PT. Aliyah Est Indonesia </span>
            estabilished on february 2014 and our company is certificate by ISM,
            ISO 9001-2008 and MLC 2006.
          </Paragraph>
          <Paragraph>
            Based on the system and the manpower, PT. Aliyah Est Indonesia
            provides the Total Ship Management Service with a good quality for
            all type of ships, such as passenger, Yacht, Chemical and oil
            tanker, Container, Bul Carrier, AHTS, AHT, Utility, Supply, Tug
            boat, Crew boat, Accommodation barge, etc.
          </Paragraph>
        </div>
      </div>

      <div className="grid md:h-96 md:grid-cols-2">
        <div>
          <LargeHeading size="sm" className="text-center">
            Vision
          </LargeHeading>
          <ul className="my-4">
            {[
              'To Develop good human resource for ship managements',
              'To achieving of good quality crew ship management',
              'To develop the good ship management company',
            ].map((item) => (
              <li key={item} className="mb-3 flex items-center gap-5">
                <CheckCircle
                  size={16}
                  className="hidden dark:stroke-white md:block"
                />
                <Paragraph className="mb-0">{item}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LargeHeading size="sm" className="text-center">
            Mission
          </LargeHeading>
          <ul className="my-4">
            {[
              'Ensure Safety of life, Property at Sea and Prevention of pollution',
              'Strenghening Technical Expertise',
              'Securing Safety in Port and Sea',
              'Development of QMS',
              'Customer Satisfaction',
            ].map((item) => (
              <li key={item} className="mb-3 flex items-center gap-5">
                <CheckCircle
                  size={16}
                  className="hidden dark:stroke-white md:block"
                />{' '}
                <Paragraph className="mb-0">{item}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AboutUs
