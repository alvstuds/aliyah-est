import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '@/components/Select'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import Paragraph from '../Paragraph'

interface InputSelectProps {
  name: string
  label: string
  options: { name: string; value: string }[]
}

const InputSelect: FC<InputSelectProps> = ({ name, label, options }) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const { field } = useController({ name, control })

  return (
    <div>
      <SelectRoot
        name={name}
        defaultValue={field.value}
        onValueChange={(value: string) => field.onChange(value)}
        disabled={isSubmitting}
      >
        <div className="relative w-full">
          <label htmlFor={name}>
            <Paragraph size="sm">{label}</Paragraph>
          </label>
          <SelectTrigger className="flex h-10 w-full justify-between rounded-md border bg-transparent bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-black dark:placeholder:text-slate-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
            <SelectValue
              placeholder={label}
              className={errors[name] ? 'text-error' : 'text-slate-400'}
            />
            <SelectIcon>
              <ChevronDown
                className={cn('h-5 w-5', errors[name] && 'stroke-error')}
              />
            </SelectIcon>
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectViewport>
            {options.map(({ name, value }, idx) => (
              <SelectItem key={idx} value={value}>
                <SelectItemText className="dark:text-black">
                  {name}
                </SelectItemText>
                <SelectItemIndicator>
                  <Check className="h-5 w-5 dark:text-black" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectRoot>
      <span className="text-error text-[10px]">
        {errors[name]?.message?.toString()}
      </span>
    </div>
  )
}

export default InputSelect
