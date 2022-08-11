
import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Col, Collapse, Dropdown, Menu, Row, Space } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { MainLayout } from '../components/layout'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'
import { Pagination } from 'antd';
import { productApi } from '../api-client/products/product-api'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const router = useRouter();
  const data = JSON.parse(JSON.stringify(products));
  const [listDataProduct, setListDataProduct] = useState<any>([]);
  const [price1, setPrice1] = useState<string>("");
  const [price2, setPrice2] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPage, setDataPage] = useState<number>(9);
  const indexOfLastData = currentPage * dataPage;
  // const indexOfLastData = currentPageRef.current * dataPage;

  const indexOfFirstData = indexOfLastData - dataPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const valueCategory = router.query?.category;
  const valuePrice1 = router.query?.price1;
  const valuePrice2 = router.query?.price1;

  const currentDataFilter = listDataProduct.slice(indexOfFirstData, indexOfLastData);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const menu2 = (
    <Menu items={[{
      label: <a href="https://www.antgroup.com" onClick={(e) => {
        e.preventDefault();
        setDataPage(6);
      }}>6</a>,
      key: '0',

    }, {
      label: <a href="https://www.antgroup.com" onClick={(e) => {
        e.preventDefault();
        setDataPage(9);
      }}>9</a>,
      key: '1',

    }]}></Menu>);
  const handleClickPaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // currentPageRef.current = pageNumber;
  }

  const listCategoryData = products.reduce((group: any, product: any) => {
    const { category } = product;
    group[category] = group[category] ?? [];
    group[category].push(product);
    return group;
  }, []);
  const listCategory = [];
  for (let category in listCategoryData) {
    listCategory.push(category);
  }
  useEffect(() => {

    if (!valueCategory) return;
    (async () => {
      const response = await fetch(`https://dummyjson.com/products/category/${valueCategory}`);
      const data = await response.json();
      setListDataProduct(data.products);
    })();

  }, [valueCategory]);
  const handleSearchCategory = (e: React.FormEvent, category: string) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/',
        query: {
          category: category,
        },
      },
    );
    setCurrentPage(1);

  }
  console.log(data.filter((item: any) => (item.price) < 1499 && (item.price) > 1000));
  const handleFilterPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const dataFilter = data.filter((item: any) => (item.price) < parseInt(price2) && (item.price) > parseInt(price1));
    // const currentData = dataFilter.slice(indexOfFirstData, indexOfLastData);
    // console.log(currentData);
    router.push(
      {
        pathname: '/',
        query: {
          category: valueCategory,
          price1: price1,
          price2: price2,
        }
      },
    );
    // if (!valueCategory) {
    // }
    if (!price1 && !price2) {
      setListDataProduct(data)
    }
    else {
      if (valueCategory && valueCategory !== "") {
        setListDataProduct(data.filter((item: any) => (item.price) < parseInt(price2 || "") && (item.price) > parseInt(price1 || "") && item.category === valueCategory));
      }
      else {
        setListDataProduct(data.filter((item: any) => (item.price) < parseInt(price2) && (item.price) > parseInt(price1)));

      }
    }
  }
  // console.log(valueCategory);
  // console.log(price1);
  // console.log(price2);

  // console.log(listDataProduct);
  // console.log(currentDataFilter);
  // console.log(currentPage);

  return (
    <>
      <main className='page-main'>
        <div className="container">
          <div className="product-section">
            <div className="navbar-product">
              <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel className='text-700' header="Price" key="1">
                  <form onSubmit={handleFilterPrice} name='filter-price'>
                    <div className='input-field'>
                      <label htmlFor="price1" className='label-price'>$</label>
                      <input type="number" id='price1' name='price1' className='input-price' onChange={(e) => setPrice1(e.target.value)} />

                    </div>
                    <div className="input-field">
                      <label htmlFor="price2" className='label-price'>$</label>
                      <input type="number" id='price2' name='price2' className='input-price' onChange={(e) => setPrice2(e.target.value)} />
                    </div>
                    <input type="submit" value="Filter" className='btn btn-filter-price' />
                  </form>
                </Panel>
                <Panel className='text-700' header="Product type" key="2">
                  <ul>
                    {
                      listCategory.map((category, index) => (
                        <li key={category}>
                          <Link href="">
                            <a onClick={(e) => handleSearchCategory(e, category)}>{category}</a>
                          </Link>
                        </li>
                      )
                      )
                    }
                  </ul>
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
                    <p className="text-700 quantity-showing">Showing{" "}
                      {
                        valueCategory === undefined ? (
                          (
                            <>
                              {currentData.length} of {data.length}
                            </>
                          )
                        ) : (

                          (
                            <>
                              {listDataProduct.length} of {listDataProduct.length}
                            </>
                          )
                        )

                      }
                      {" "}
                      result</p>
                  </div>
                  <Dropdown className='text-700' overlay={menu2} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                      <Space>
                        Show: {dataPage}
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
                    valueCategory === undefined ? (currentData && (
                      (currentData.map((product: any, index: number) =>
                      (<>
                        <ProductCard key={product.id} product={product}></ProductCard>
                      </>
                      )
                      ))
                    )) : (
                      currentDataFilter &&
                      currentDataFilter.map((product: any, index: number) =>
                        <ProductCard key={product.id} product={product}></ProductCard>
                      )
                    )
                  }

                </div>
                {
                  valueCategory === undefined ? (
                    <Pagination style={{ textAlign: "center" }} defaultCurrent={1} total={
                        // ((data.length/dataPage) - (data.length/dataPage/10)) /  0 &&  (data.length/dataPage)
                      ((data.length/dataPage)*10 - ((data.length/dataPage)) + 10)
                    
                    } onChange={handleClickPaginate} />

                  ) :
                    (
                      listDataProduct &&
                      <Pagination style={{ textAlign: "center" }} defaultCurrent={1} total={listDataProduct.length} onChange={handleClickPaginate} />

                    )
                }

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
