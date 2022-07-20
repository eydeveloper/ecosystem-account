import {useMutation} from 'react-query';
import {setJwtToken} from '../../../shared/lib/utils/jwt';
import {User} from '../model';
import {UserService} from '../model/service';

export const useLogin = () => {
  const {mutateAsync: login, isLoading, isError, error} = useMutation(
    ['user'],
    (data: User) => UserService.login(data),
    {
      onSuccess: (response) => {
        setJwtToken(response.data.token);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );

  return {login, isLoading, isError, error};
};
