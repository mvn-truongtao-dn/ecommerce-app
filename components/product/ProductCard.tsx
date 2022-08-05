import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartAddItem } from '../../store/productSlice';
import { RootState } from '../../store/store';

export interface ProductCardProps {
  product: any,

}

export default function ProductCard({ product
}: ProductCardProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.products.cart.cartItems);
  const handleClickAddToCart = async (product: any) => {
    const existItem = cartItems.find((item) => item.id === product.id);
    const quantity = existItem ? parseInt(existItem.quantity) + 1 : 1;
    const { data } = await axios.get(`https://dummyjson.com/products/${product.id}`);
    if (data.stock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch(CartAddItem({ ...product, quantity }));
    document.querySelector(".animation-addtocart")?.classList.add("sendtocart");
  }
  return (
    <Card
      hoverable
      cover={<Link href={`/products/${product.id}`}>
        <a href="">
          <Image alt={product.title} src={product.thumbnail} layout="responsive" width={240} height={240} className="custom-image" />
        </a>
      </Link>}
    >

      <Meta title={product.title} description={product.description} />
      <Button onClick={() => handleClickAddToCart(product)} className='btn' type='primary'>Add to Cart</Button>
    </Card>
  );
}
