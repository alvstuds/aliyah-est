import axios from 'axios';
import useSwr from 'swr';

const useDashboard = () => {
  const getData = async () => {
    const { data } = await axios.get('/api/dashboard');
    return data;
  };

  const { data, isLoading, error, mutate } = useSwr('dashboard', getData);

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
};

export default useDashboard;
