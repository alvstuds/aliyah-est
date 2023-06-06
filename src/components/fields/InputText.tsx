import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import Paragraph from '../Paragraph'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  isSecured?: boolean
  disabled?: boolean
}

const InputText: FC<InputTextProps> = ({
  name,
  label,
  isSecured,
  disabled,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name}>
          <Paragraph size="sm">{label}</Paragraph>
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'flex h-10 w-full rounded-md border bg-transparent bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-black dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
            className
          )}
          id={name}
          type={isSecured ? (showPassword ? 'text' : 'password') : 'text'}
          disabled={isSubmitting || disabled}
          {...register(name)}
          {...props}
        />
        {isSecured && (
          <button
            type="button"
            className="group absolute inset-y-0 right-0 mr-4 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
      <span className="text-[10px] text-red-500">
        {errors[name]?.message?.toString()}
      </span>
    </div>
  )
}

export default InputText
