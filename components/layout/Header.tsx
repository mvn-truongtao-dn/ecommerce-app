import { ShoppingCartOutlined } from '@ant-design/icons';
import Search from 'antd/lib/transfer/search';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
export interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  const cartItem = useSelector((state: RootState) => state.products.cart.cartItems);
  console.log(cartItem);
  const [quantity, setQuantity] = useState<any>([]);
  useEffect(() => {
    setQuantity(cartItem);

  }, [cartItem])
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSearchClick = (e: React.FormEvent) => {
  }

  console.log(quantity);

  return (
    <header className='page-header'>
      <div className="container header-content">
        <div className="header-left">
          {/* <div className="logo">
          </div> */}

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
          {/* <form onSubmit={handleSearchClick}>
            <input type="text" name='search' className='input-search' placeholder='Search for products ...' onChange={(e) => setQuery(e.target.value)} />
            <button type="submit"></button>
          </form> */}
          {/* <svg className="icon searchbar_icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg> */}
        </div>
        <div className="header-right">
          <nav className='user-nav'>
            <ul className="usernav-list">
              <li className="usernav-item cart-header">
                {/* <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="currentColor"><path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 5H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                <Link href="/cart">
                  <a >
                    <ShoppingCartOutlined className='icon' />
                    <span className='usernav-count'>{quantity.length}</span>
                  </a>
                </Link>
              </li>
              <li className="usernav-item ml-10">
                <div className='usernav-avatar-button'></div>
              </li>
              {/* <li className='usernav-item ml-10'>
                <button>
                </button>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
