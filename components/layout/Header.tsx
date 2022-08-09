import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Search from 'antd/lib/transfer/search';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Auth } from "../common/auth";
import { useAuth } from "../../hooks/use-auth";
import { Dropdown, Space, Menu } from 'antd';
export interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  const cartItem = useSelector((state: RootState) => state.products.cart.cartItems);
  const { profile, logout } = useAuth();
  console.log(cartItem);
  const [quantity, setQuantity] = useState<any>([]);
  useEffect(() => {
    setQuantity(cartItem);

  }, [cartItem])
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSearchClick = (e: React.FormEvent) => {
  }
  const handleLogoutClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log('failed to logout', error);
    }
    console.log("ok");

  }
  const menu = (
    <Menu items={[{
      label: <a href="https://www.antgroup.com">{profile?.username}</a>,
      key: '0',

    }, {
      label: <Link href="" >
        <a onClick={handleLogoutClick}>
          Logout
        </a>
      </Link>,
      key: '1',

    }]}></Menu>);
  console.log(quantity);

  return (
    // <Auth>
      <header className='page-header'>
        <div className="container header-content">
          <div className="header-left">
            <nav className='menu-nav'>
              <ul className="menu-list">
                <li className="menu-item">
                  <Link href="/">
                    All
                  </Link>
                </li>
                <li className="menu-item">New Arrivals</li>
                <li className="menu-item">Featured</li>
              </ul>
            </nav>
          </div>
          <div className="header-middle">
          </div>
          <div className="header-right">
            <nav className='user-nav'>
              <ul className="usernav-list">
                <li className="usernav-item cart-header">
                  <Link href="/cart">
                    <a >
                      <ShoppingCartOutlined className='icon' />
                      <span className='usernav-count'>{quantity.length}</span>
                    </a>
                  </Link>
                </li>
                <li className="usernav-item ml-10">
                  {!profile?.username ? (
                    <Link href="/login">Sign in</Link>
                  )
                    :
                    (

                      <Dropdown className='text-700' overlay={menu} trigger={['click']}>
                        <a onClick={e => e.preventDefault()}>
                          <Space>
                            <div className='usernav-avatar-button'></div>
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    )
                  }
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header >
    // </Auth >
  );
}
