import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputRadioProps {
  label: string
  name: string
  value: string
}

const InputRadio: FC<InputRadioProps> = ({ name, label, value }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  return (
    <div className="flex items-center gap-3">
      <input
        type="radio"
        id={label}
        className="accent-primary-4 h-4 w-4 transition duration-200 focus:outline-none"
        value={value}
        disabled={isSubmitting}
        {...register(name)}
      />
      <label
        htmlFor={label}
        className={errors[name] ? 'text-error' : 'text-neutral-4'}
      >
        {label}
      </label>
    </div>
  )
}

export default InputRadio
