
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Col, Collapse, Dropdown, Menu, Row, Space } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { MainLayout } from '../components/layout'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'
import { Pagination } from 'antd';
import { productApi } from '../api-client/products/product-api'

export interface HomeProps {
  products: any
}
const { Panel } = Collapse;
const text = "hello";
const menu = (
  <Menu items={[{
    label: <a href="https://www.antgroup.com">A-Z</a>,
    key: '0',

  }, {
    label: <a href="https://www.antgroup.com">Z-A</a>,
    key: '1',

  }]}></Menu>);
const Home = ({ products }: HomeProps) => {
  console.log(products);
  const data = JSON.parse(JSON.stringify(products))
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPage, setDataPage] = useState<number>(9);
  const indexOfLastData = currentPage * dataPage;
  const indexOfFirstData = indexOfLastData - dataPage;
  const currentData = JSON.parse(JSON.stringify(products)).slice(indexOfFirstData, indexOfLastData);
  console.log(currentData);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const handleClickPaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <main className='page-main'>
        <div className="container">
          <div className="product-section">
            <div className="navbar-product">
              <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel className='text-700' header="Price" key="1">
                  <p>{text}</p>
                </Panel>
                <Panel className='text-700' header="Product type" key="2">
                  <p>{text}</p>
                </Panel>
                <Panel className='text-700' header="Brand" key="3">
                  <p>{text}</p>
                </Panel>
                <Panel className='text-700' header="Color" key="3">
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </div>
            <div className="product-block flex">
              <div className="product-top">
                <div className="product-top-content">

                  <Dropdown className='text-700' overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>
                        Sort by : Alphabetically, A-Z
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div>
                    <p className="text-700 quantity-showing">Showing 1 - 12 of 26 result</p>
                  </div>
                  <Dropdown className='text-700' overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>
                        Show: 12
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div>
                    <MenuOutlined className="icon" />
                  </div>
                </div>
              </div>
              <div className="product-list">
                <div className="product-list-content">
                  {
                    currentData.map((product: any, index: number) =>
                      <ProductCard key={index} product={product}></ProductCard>
                    )
                  }
                </div>
                <Pagination style={{ textAlign: "center" }} defaultCurrent={1} total={data.length} onChange={handleClickPaginate} />

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
Home.Layout = MainLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://dummyjson.com/products/')
  const data = (await res.json());
  return {
    props: {
      products: data.products
    }
  }
}

export default Home
