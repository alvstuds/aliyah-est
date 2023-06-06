import useStore from '@/store/useStore'
import useSwr from 'swr'

const useAdminList = () => {
  const { getAdminList } = useStore()
  const { data, isLoading, error, mutate } = useSwr('adminList', getAdminList)

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  }
}

export default useAdminList
