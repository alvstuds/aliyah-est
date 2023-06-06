import useStore from '@/store/useStore';
import useSwr from 'swr';

const useCrewList = (status: string | null) => {
  const { getCrewList } = useStore();
  const { data, isLoading, error, mutate } = useSwr('crewList', () =>
    getCrewList(status)
  );

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
};

export default useCrewList;
