import { useQuery } from '@tanstack/react-query';
import { LevelServices } from '@/services/level.services';

export const useLevel = () => {
  const levelService = new LevelServices();

  const levelAll = useQuery({
    queryKey: ['levels'],
    queryFn: () => levelService.getLevels(),
  });
  return {
    data: levelAll.data !== undefined ? levelAll.data : [],
    error: levelAll.error !== undefined ? levelAll.error : null,
    loading: levelAll.isLoading,
    refresh: levelAll.refetch,
  };
};
