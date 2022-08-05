import axios from 'axios';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface ListOrderPageProps {
  order: any[]
}
const fetcher = async () => {
  const response = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/orders');
  return await response.json();
};
export default function ListOrderPage({ order }: ListOrderPageProps) {
  console.log(order);
  const { data: orders } = useSWR('https://6274e2bf345e1821b230ebee.mockapi.io/orders', fetcher);

  console.log(orders);

  return (
    <>
      <h1>Hello</h1>
      {
        orders && orders.map((item: any) => (
          <>
            <h1>Order{item.id}</h1>
            <h1>{item.isPaid.toString()}</h1>
          </>
        )
        )
      }
      <div>
      
      </div>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios.get('https://6274e2bf345e1821b230ebee.mockapi.io/orders')
  return {
    props: {
      order: data.data
    },
    revalidate: 5
  }
}