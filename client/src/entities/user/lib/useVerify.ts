import {useQuery} from 'react-query';
import {UserService} from '../model/service';
import {setJwtToken} from '../../../shared/lib/utils/jwt';

export const useVerify = () => {
  const {data, refetch, isLoading, isSuccess, isError} = useQuery(
    ['user'],
    () => UserService.verify(),
    {
      select: ({data}) => ({
        token: data.token,
        user: data.user
      }),
      onSuccess: ({token}) => {
        setJwtToken(token);
      },
      enabled: false,
      staleTime: Infinity
    }
  );

  return {data, refetch, isLoading, isSuccess, isError};
};
