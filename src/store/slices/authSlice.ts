import { signIn, signOut } from 'next-auth/react'
import { StateCreator } from 'zustand'
import { IAuth } from '../types'
import { toast } from '@/components/toast'

const createAuthSlice: StateCreator<IAuth> = () => ({
  login: async (data) => {
    await signIn('credentials', {
      ...data,
      callbackUrl: process.env.NEXTAUTH_URL,
    })
  },
  logout: async (setIsLoading) => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later.',
        type: 'error',
      })
    }
  },
})

export default createAuthSlice
