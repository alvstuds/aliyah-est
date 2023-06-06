import { mainRankOpts, pvOpts, skillsOpts } from '@/lib/data'
import { FC, useState } from 'react'
import InputSelect from '../fields/InputSelect'
import InputText from '../fields/InputText'
import { Button } from '../Button'
import LargeHeading from '../LargeHeading'

interface IProps {
  setActiveSection?: (sec: string) => void
}

const PositionSubForm: FC<IProps> = ({ setActiveSection }) => {
  const [other, showOther] = useState(false)

  const content = [
    {
      name: 'mainRank',
      label: 'Main Rank',
      options: mainRankOpts,
    },
    {
      name: 'prevVesselType',
      label: 'Previous Vessel Type',
      options: pvOpts,
    },
    {
      name: 'englishSkills',
      label: 'English Skills',
      options: skillsOpts,
    },
  ]

  return (
    <>
      <LargeHeading size="sm">Position Submission</LargeHeading>
      <div className="space-y-3">
        {content.map(({ name, label, options }) =>
          options ? (
            <div key={name}>
              <InputSelect name={name} label={label} options={options} />
              {name === 'mainRank' && (
                <div className="pb-4">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      id="other"
                      onChange={(e) => showOther(e.target.checked)}
                    />
                    <label htmlFor="other" className="text-sm">
                      Other
                    </label>
                  </div>
                  {other && (
                    <InputText
                      name="other_mainRank"
                      label={`Other ${label} (optional)`}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <InputText name={name} label={label} key={name} />
          )
        )}
      </div>
      {setActiveSection && (
        <div className="space-x-3 text-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setActiveSection('sec1')}
          >
            Prev
          </Button>
          <Button type="button" onClick={() => setActiveSection('sec3')}>
            Next
          </Button>
        </div>
      )}
    </>
  )
}

export default PositionSubForm
