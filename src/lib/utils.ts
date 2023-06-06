import crypto from 'crypto'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// helper function to set key td and db
export const makeArray = (item: any, prefix: string) => {
  const draft = Object.fromEntries(
    Object.entries(item).filter(([key]) => key.includes(prefix))
  )

  let x = 0
  const data_array: any = []

  Object.keys(draft).forEach((key) => {
    if (key.includes(x.toString())) {
      const temp: any = Object.fromEntries(
        Object.entries(draft).filter(([key]) => key.includes(x.toString()))
      )

      for (const key in temp) {
        const newKey = key.split('_')[2]
        temp[newKey] = temp[key]
        delete temp[key]
      }

      data_array.push({ ...temp, fileUrl: '', fileId: '' })
      x++
    } else {
      return
    }
  })

  return data_array
}

export const generateSHA1 = (data: any) => {
  const hash = crypto.createHash('sha1')
  hash.update(data)
  return hash.digest('hex')
}

export const generateSignature = (folder: string, publicId: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const apiSecret = process.env.NEXT_PUBLIC_C_API_SECRET

  return `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}&upload_preset=ml_default${apiSecret}`
}

interface uploadFile {
  file: any
  folder: string
  publicId: string
}

export const createUploadFile = ({ file, folder, publicId }: uploadFile) => {
  const fileData = new FormData()
  const timestamp = Math.round(new Date().getTime() / 1000).toString()
  const signature = generateSHA1(generateSignature(folder, publicId))

  fileData.set('file', file)
  fileData.append('upload_preset', 'ml_default')
  fileData.append('folder', folder)
  fileData.append('signature', signature)
  fileData.append('timestamp', timestamp)
  fileData.append('public_id', publicId)
  fileData.append('overwrite', 'true')
  fileData.append('api_key', process.env.NEXT_PUBLIC_C_API_KEY!)

  return fileData
}
