import useStore from '@/store/useStore'
import useSwr from 'swr'

const useShipList = () => {
  const { getShipList } = useStore()
  const { data, isLoading, error, mutate } = useSwr('shipList', getShipList)

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  }
}

export default useShipList
