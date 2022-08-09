import { EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import logo from "../images/Logo.png"
import { useState } from 'react';
import { authApi } from '../api-client/auth-client';
import { useAuth } from '../hooks/use-auth';
import { Spin } from 'antd';
export interface IAppProps {
}

export default function App(props: IAppProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useAuth({ revalidateOnMount: false });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await authApi.login({
        username: userName,
        password: password,
      });
      await mutate();
      setIsLoading(false);
      router.push('/');
    } catch (error) {

    }
  }
  return (
    <>

      {
        isLoading ? (
          <div className='bg-loading'>
            <Spin size='large'>

            </Spin>
          </div>
        ) : null
      }
      <div className='login-page'>
        <div className="login-left">
          <div className="logo-login">
            <Image src={logo}></Image>
          </div>
        </div>
        <div className="login-right">
          <div className="login-content">
            <h3>Sign In</h3>
            <p>Please fill your information below</p>
            <form onSubmit={handleLogin}>
              <div className='row-input'>
                <input className='input-field' type="text" name='username' placeholder='Username' onChange={(e) => setUserName(e.target.value)} />
                <UserOutlined className="icon icon-login" />
              </div>
              <div className='row-input'>
                <input className='input-field' type="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <EyeInvisibleOutlined className='icon icon-login' />
              </div>
              <input type="submit" className='btn btn-login' />
            </form>
            <div className='divider'></div>
            <div className='flex justify-content-between'>
              <Link href="">Already have an account?</Link>
              <Link href="">Login to your account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
