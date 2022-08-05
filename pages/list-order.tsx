import axios from 'axios';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
export interface ListOrderPageProps {
  order: any[]
}

export default function ListOrderPage({ order }: ListOrderPageProps) {
  console.log(order);

  return (
    <>
      <h1>Hello</h1>
      {
        order.map((item: any) => (
          <>
            <h1>Order{item.id}</h1>
            <h1>{item.isPaid.toString()}</h1>
          </>
        )
        )
      }
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios.get('https://6274e2bf345e1821b230ebee.mockapi.io/orders')
  return {
    props: {
      order: data.data
    }
  }
}