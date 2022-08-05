import { Spin } from 'antd';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import Header from '../../components/layout/Header';
import ProdDetail from '../../components/product/ProductDetail';

export interface ProductDetailProps {
  product: any
}

export default function ProductDetail({ product }: ProductDetailProps) {
  console.log(product);
  const router = useRouter();
  if (router.isFallback) {
    return <><Spin></Spin></>
  }
  return (
    <>
      <Header></Header>
      <main className='page-main'>
        <ProdDetail product={product} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://dummyjson.com/products/')
  const data = (await res.json()).products;
  return {
    paths: data.map((product: any) => ({ params: { productId: product.id.toString() } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const productId = context.params?.productId;
  const res = await fetch(`https://dummyjson.com/products/${productId}`)
  const data = (await res.json());
  return {
    props: {
      product: data
    }
  }

}