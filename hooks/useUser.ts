import { User } from '@/interfaces/User';
import { UserServices } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const userServices = new UserServices();
  const createUser = async (user: User) => {
    try {
      await userServices.createUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const useUserByEmail = (email: string) => {
    const userServices = new UserServices();
    const user = useQuery({
      queryKey: ['user', email],
      queryFn: () => userServices.getUserByEmail(email),
    });

    const auxUser: User = {
      id: '',
      name: '',
      email: '',
      points: 0,
      levelStatus: {},
      organization: null,
    };

    return {
      user: user.data !== undefined ? user.data : auxUser,
      error: user.error !== undefined ? user.error : null,
      loading: user.isLoading,
    };
  };

  const getUser = async (id: string) => {
    try {
      return await userServices.getUser(id);
    } catch (error) {
      console.error(error);
    }
  };
  const updateLevelStatusByEmail = async (
    email: string,
    score: number,
    levelId: number,
  ) => {
    try {
      await userServices.updateLevelStatusByEmail(email, score, levelId);
    } catch (error) {
      console.error(error);
    }
  };

  const ranking = useQuery({
    queryKey: ['ranking'],
    queryFn: () => userServices.getRanking(),
  });

  return {
    createUser,
    getUser,
    useUserByEmail,
    updateLevelStatusByEmail,
    ranking,
  };
};
