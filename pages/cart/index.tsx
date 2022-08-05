import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layout/Header';
import { RootState } from '../../store/store';
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from 'next/link';
import axios from 'axios';
import { CartAddItem, DeleteCartItem } from '../../store/productSlice';

export interface CartPageProps {
}

export default function CartPage(props: CartPageProps) {
  const cartItem = useSelector((state: RootState) => state.products.cart.cartItems);
  const [listCart, setListCart] = useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setListCart(cartItem);
  }, [cartItem]);

  const handleUpdateCart = async (item: any, quantity: string) => {
    const { data } = await axios.get(`https://dummyjson.com/products/${item.id}`);
    if (data.stock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch(CartAddItem({ ...item, quantity }));
  }
  const handleDeleteCartItem = async (item: any) => {
    dispatch(DeleteCartItem(item))
  }
  return (
    <>
      <Header></Header>
      <main className='page-main'>
        <div className='container'>
          <div className='page-cart'>
            <div className='table-cart'>
              {listCart.length === 0 ? (
                <div>
                  Cart is empty.{' '}
                  <Link href="/" passHref>
                    <a>Go shopping</a>
                  </Link>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listCart.map((item: any) =>
                        <>
                          <tr>
                            <td>
                              <Image src={item.thumbnail} alt={item.title} layout="responsive" width={200} height={200} className="custom-image" />
                            </td>
                            <td>
                              {item.title}
                            </td>
                            <td>
                              <select value={item.quantity} name="quantity" id="" onChange={(e) => handleUpdateCart(item, e.target.value)}>
                                {[...Array.from(Array(item.stock).keys())].map((x) =>
                                (
                                  <option value={x + 1} key={x + 1}>{x + 1}</option>
                                )
                                )}
                              </select>
                            </td>
                            <td>
                              {item.price}
                            </td>
                            <td>
                              <button className='btn' onClick={() => handleDeleteCartItem(item)}>X</button>
                            </td>
                          </tr>
                        </>
                      )
                    }
                  </tbody>
                </table>
              )}

            </div>
            <div className="total-price">
              <span className='price'>Subtotal ({listCart.reduce((a: number, c: any) => a + parseInt(c.quantity), 0)}{' '} items)
                : ${listCart.reduce((a: number, c: any) => a + a + c.quantity * c.price, 0)}</span>
              <button className='btn btn-checkout'>
                <Link href="/shipping">
                    check out
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
