import { Col, Layout, LayoutProps, Menu, Row } from 'antd';
import type { MenuProps } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { useRouter } from 'next/router';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import Header from './Header';

export function MainLayout({ children }: LayoutProps) {

  return (
    <>
      
      <Header></Header>
      <>
        {children}
      </>
      <footer>
        <div className=''>
          <div className="page-footer">
            <ul className='group-social'>
              <li className="item-social"><FacebookOutlined /></li>
              <li className="item-social"><InstagramOutlined /></li>
              <li className="item-social"><TwitterOutlined /></li>
              <li className="item-social"><LinkedinOutlined /></li>
            </ul>
            <div>Copyright ©2020 All rights reserved</div>
          </div>
        </div>
      </footer>
    </>
  );
}
