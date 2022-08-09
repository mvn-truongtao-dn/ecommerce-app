import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { notification, Spin } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export interface AuthProps {
  children: any;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading }: { profile: any; firstLoading: any } = useAuth();

  useEffect(() => {
    console.log('loading', !firstLoading);
    console.log('loading', !profile?.username);

    if (!firstLoading && !profile?.username) {
      router.push('/login');
      notification.open({
        message: "You need to sign in",
        icon: <SmileOutlined rotate={180} style={{ color: '#108ee9' }} />,
        className: 'notification-success'
      })
    }
  }, [router, profile, firstLoading]);

  return (
    <>
      {!profile?.username ? (<Spin></Spin>) : (<>{children}</>)}
    </>
  )
}
