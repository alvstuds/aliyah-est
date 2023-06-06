import { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, useFormContext } from 'react-hook-form'
import Paragraph from '../Paragraph'
import { File } from 'lucide-react'

interface InputFileProps {
  name: string
  label?: string
}

const InputDocument: FC<InputFileProps> = ({ name, label }) => {
  const [preview, setPreview] = useState<any>()

  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const { field } = useController({ name, control })

  useEffect(() => {
    const prev = JSON.parse(window.localStorage.getItem(name)!)
    prev !== 'null' && setPreview(prev!)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(preview))
  }, [preview])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'text/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      setPreview(acceptedFiles[0])
      field.onChange(acceptedFiles)
    },
  })

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name}>
          <Paragraph size="sm">{label}</Paragraph>
        </label>
      )}

      <div
        {...getRootProps({ className: 'dropzone' })}
        className="rounded-md border bg-transparent bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-black dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
      >
        <input {...getInputProps()} name={name} disabled={isSubmitting} />
        {preview ? (
          <div className="flex items-center gap-3">
            <File className="w-5" />
            <Paragraph size="sm" className="mb-0">
              {preview.path}
            </Paragraph>
          </div>
        ) : (
          <span className="text-xs font-semibold text-gray-300">
            Drop Document Here
          </span>
        )}
      </div>
      <span className="text-[10px] text-red-500">
        {errors[name]?.message?.toString()}
      </span>
    </div>
  )
}

export default InputDocument
