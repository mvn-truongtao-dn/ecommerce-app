import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '../api-client/auth-client';
import type { SWRConfiguration } from 'swr';

export interface User {
  username: string;
  city: string;
  email: string;
}
const config: SWRConfiguration = {
  dedupingInterval: 360000,
  revalidateOnFocus: false,
};
export function useAuth(options?: Partial<PublicConfiguration>) {
  const { mutate, error } = useSWR('/profile', {
    dedupingInterval: 1000,
    revalidateOnFocus: false,
    ...options,
  });
  const { data: profile } = useSWR<User>('/profile', config);

  const firstLoading = profile === undefined && error === undefined;
  console.log(firstLoading);

  const login = async () => {
    // await authApi.login({
    //   username: 'test1',
    //   password: '123456',
    // });
    // await mutate();
  };
  const logout = async () => {
    await authApi.logout();
    mutate({}, false);
  };
  return { profile, mutate, error, login, logout, firstLoading };
}
