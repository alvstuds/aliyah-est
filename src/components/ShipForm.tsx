'use client'
import { shipSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ship } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../store/useStore'
import Form from './fields/Form'
import InputText from './fields/InputText'
import { Button } from './Button'
import InputSelect from './fields/InputSelect'
import { pvOpts } from '@/lib/data'

interface ShipFormProps {
  type: 'add' | 'edit'
  ship?: Ship
}

const ShipForm: FC<ShipFormProps> = ({ type, ship }) => {
  const router = useRouter()
  const { addShip, editShip } = useStore()

  const methods = useForm<Ship>({
    resolver: zodResolver(shipSchema),
    defaultValues: type ? ship : undefined,
  })

  return (
    <Form
      methods={methods}
      onSubmit={
        type === 'add'
          ? (values) => addShip(values, router)
          : (values) => editShip(values, router)
      }
      className="mx-auto max-w-5xl"
    >
      <div className="grid grid-cols-2 gap-3">
        <InputText name="imoNumber" label="IMO Number" />
        <InputText name="name" label="Name" />
        <InputSelect name="type" label="Type" options={pvOpts} />
        <InputText name="flag" label="Flag" />

        <div className="col-span-2 grid grid-cols-3 gap-3">
          <InputText name="grt" label="GRT" />
          <InputText name="dwt" label="DWT" />
          <InputText name="hp" label="HP" />
        </div>
        <InputText name="callSign" label="Call Sign" />
        <InputText name="yearBuilt" label="Year Built" />
      </div>
      <div className="mt-4 space-x-3 text-right">
        <Button
          onClick={() => router.replace('/ship')}
          type="button"
          variant="ghost"
          disabled={methods.formState.isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={methods.formState.isSubmitting}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default ShipForm
