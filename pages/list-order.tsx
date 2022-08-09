import { Col, DatePicker, DatePickerProps, Row, Table } from 'antd';
import axios from 'axios';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import Link from 'next/link';
import Search from 'antd/lib/input/Search';
import { useRouter } from 'next/router';
export interface ListOrderPageProps {
  order: any[]
}
interface DataOrder {
  id: number,
  order: string,
  address: string,
  totalPrice: string,
  isPaid: boolean,
  paidAt?: any,
  createdAt: any,
}
const { RangePicker } = DatePicker;
const dateFormat = 'MM/DD/YYYY';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const fetcher = async () => {
  const response = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/orders');
  return await response.json();
};
export default function ListOrderPage({ order }: ListOrderPageProps) {
  const { data: orders } = useSWR('https://6274e2bf345e1821b230ebee.mockapi.io/orders', fetcher);
  const router = useRouter();
    
  const [listBillOrder, setListBillOrder] = useState<any[]>();
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'order',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'IsPaid',
      dataIndex: 'isPaid',
      key: 'isPaid',
    },
    {
      title: 'PaidAt',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
  const dataSource: DataOrder[] = [];
  useEffect(() => {
    setListBillOrder(orders);
  }, [orders]);
  listBillOrder?.map((item, index) => {
    dataSource.push({
      id: index + 1,
      order: `order ${index + 1}`,
      address: `${item.shippingAddress.fullname}, ${item.shippingAddress.address}
      ${item.shippingAddress.city}, ${item.shippingAddress.postalCode},
      ${item.shippingAddress.country}`,
      totalPrice: item.totalPrice,
      isPaid: item.isPaid.toString(),
      paidAt: moment(item.paidAt).format('LLLL'),
      createdAt: moment(item.createdAt).format('LLLL'),

    })
  })

  const handleChangeDate = (date: moment.Moment | null, dateString: string) => {
    setListBillOrder(orders.filter((item: any) => moment(item.createdAt).format('L') === dateString));
    if (dateString === "") {
      setListBillOrder(orders);
    }
  }
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setListBillOrder(orders.filter((item: any) => moment(item.createdAt).format('L') === router.query.time && item.title === router.query.order));  
  }
  return (
    <>
      <Row>
        <Col span={4}>
          <Link href="/">
            Home
          </Link>
        </Col>
        <Col span={4} offset={16}>
          <h1>Wellcome</h1>

        </Col>

      </Row>
      <Row>
        <Col span={4} offset={10}>
          <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={handleChangeDate} />

        </Col>
        <Col span={10}>
          {/* <form onSubmit={handleSearch}>
            <input type="search" name="order" id="" />
            <DatePicker name='time' defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={handleChangeDate} />
            <input type="submit" value="submit" />

          </form> */}
        </Col>


      </Row>
      <Table dataSource={dataSource} columns={columns} />;


    </>
  );
}