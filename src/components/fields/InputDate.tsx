import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'
import { FC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useController, useFormContext } from 'react-hook-form'
import Paragraph from '../Paragraph'

interface InputDateProps {
  name: string
  label: string
  selectRange?: boolean

  onChange?: any
}

const InputDate: FC<InputDateProps> = (props) => {
  const { name, label, selectRange, onChange } = props
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const { field } = useController({ name, control })

  return (
    <div>
      {label && (
        <label htmlFor={name}>
          <Paragraph size="sm">{label}</Paragraph>
        </label>
      )}
      <div className="relative">
        <DatePicker
          id={name}
          name={name}
          showPopperArrow={false}
          selected={field.value && new Date(field.value)}
          onChange={selectRange ? onChange : (value) => field.onChange(value)}
          disabled={isSubmitting}
          calendarClassName="z-50"
          className="flex h-10 w-full rounded-md border bg-transparent bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-black dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
        />
        <label
          htmlFor={name}
          className="absolute inset-y-0 right-0 grid place-items-center pr-2.5"
        >
          <Calendar
            className={cn(
              'h-6 w-6',
              errors[name] ? 'stroke-error' : 'stroke-neutral-4'
            )}
          />
        </label>
      </div>
      <span className="text-error text-[10px]">
        {errors[name]?.message?.toString()}
      </span>
    </div>
  )
}

export default InputDate
