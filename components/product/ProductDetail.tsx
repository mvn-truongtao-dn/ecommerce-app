import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import Image from 'next/image';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartAddItem } from '../../store/productSlice';
import { RootState } from '../../store/store';

export interface ProdDetailProps {
  product: any
}

export default function ProdDetail({ product }: ProdDetailProps) {
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
  React.useEffect(() => {
    
   
  })
  return (
    <div className='product-detail'>

      <div className='product-img'>
        <Card
          className='product-image-card'
          hoverable
          cover={<Image alt={product.title} src={product.thumbnail} className="custom-image" layout="responsive" width={540} height={300} />}>
        </Card>
        <div className="list-image-product">
          <ul className='list-image'>
            <li className='item-image'><Image alt={product.title} src={product.images[0]} className="custom-image" layout="responsive" width={540} height={300} /></li>
            <li className='item-image'><Image alt={product.title} src={product.images[1]} className="custom-image" layout="responsive" width={540} height={300} /></li>
            <li className='item-image'><Image alt={product.title} src={product.images[3]} className="custom-image" layout="responsive" width={540} height={300} /></li>
            <li className='item-image'><Image alt={product.title} src={product.images[4]} className="custom-image" layout="responsive" width={540} height={300} /></li>
          </ul>
        </div>

      </div>
      <div className='product-content'>
        <h2>{product.title}</h2>
        <span className='price'>${product.price}</span>
        <div className="product-color flex-column">
          <span className='subtitle-product uppercase'>color</span>

        </div>
        <div className="product-size flex-column">
          <span className='subtitle-product uppercase'>size</span>
          <div className="listbox">
            <button className='itembox'>s</button>
            <button className='itembox'>m</button>
            <button className='itembox'>l</button>
            <button className='itembox'>xl</button>
            <button className='itembox'>xxl</button>
          </div>
        </div>
        <div className="product-description">
          <span>
            Show off your love for Next.js and Vercel with this unique,
            <strong>limited edition</strong> t-shirt. This design is part of a limited run,
            numbered drop at the June 2021 Next.js Conf. It features a unique,
            handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!
            <strong>All proceeds will be donated to charity</strong>.
          </span>
        </div>
        <div className="product-evaluate">
          <div className="rating">

          </div>
          <div className="review-product">
            <span>36 reviews</span>
          </div>
        </div>
        <button className='uppercase btn-addtocart' onClick={() => handleClickAddToCart(product)}>add to cart
          <span className='animation-addtocart'>
            <Image alt={product.title} src={product.thumbnail} className="custom-image" layout="responsive" width={540} height={300} />
          </span>
        </button>
      </div>
    </div>
  );
}
