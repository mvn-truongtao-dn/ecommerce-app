import Image from 'next/image';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layout/Header';
import { RootState } from '../../store/store';
import { useState, useEffect } from 'react';
import StepComponent from '../../components/step';
import { useSnackbar } from 'notistack';
import { getError } from '../../untils/error';
import axios from 'axios';
import { CartClear } from '../../store/productSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

export interface Props {
}
interface ShippingAddressObj {
  fullname: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
}
interface PaymentMethodObj {
  paymentMethod: string;
}
export default function PlaceOrder(props: Props) {
  const cart = useSelector((state: RootState) => state.products.cart);
  const { shippingAddress, cartItems, paymentMethod } = cart;
  const [shippingInfo, setShippingInfo] = useState<ShippingAddressObj>();
  const [paymentMethodInfo, setPaymentMethodInfo] = useState<PaymentMethodObj>();
  const [cartItemInfo, setCartItemInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setShippingInfo(shippingAddress);
    setPaymentMethodInfo(paymentMethod);
    setCartItemInfo(cartItems);
  }, [shippingAddress, cartItems, paymentMethod]);
  const itemsPrice = cartItemInfo?.reduce((a: number, b: any) => a + (b.quantity) * b.price, 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePlaceOrder = async () => {
    // closeSnackbar();
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://6274e2bf345e1821b230ebee.mockapi.io/orders', {
        cartItems: cartItemInfo,
        paymentMethod: paymentMethod,
        shippingAddress: shippingInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }
      );
      console.log(data);

      dispatch(CartClear());
      Cookies.remove('cartItems');
      setIsLoading(false);
      router.push(`/orders/${data.id}`);
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Header></Header>
      <div className="container">
        <StepComponent id={3} />
        <h2>Place Order</h2>
        <div className='section-placeorder'>
          <div className='info-order'>
            <div className='info-shipping block-info-placeorder'>
              <h3>Shipping Address</h3>
              <p>{shippingInfo?.address}</p>
            </div>
            <div className='info-payment-method block-info-placeorder'>
              <h3>Payment Method</h3>
              <p>{paymentMethodInfo?.paymentMethod}</p>
            </div>
            <div className='info-cart block-info-placeorder'>
              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItemInfo?.map((item: any) =>
                    (<tr key={item.id}>
                      <td>
                        <Image src={item.thumbnail} alt={item.title} layout="responsive" width={200} height={200} className="custom-image" />
                      </td>
                      <td>
                        {item.title}
                      </td>
                      <td>
                        {item.quantity}
                      </td>
                      <td>
                        {item.price}
                      </td>

                    </tr>
                    )
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="total-bill block-info-placeorder">
            <h3>Order Summary</h3>
            <div className='detail-bill'>
              <div className="item-bill">
                <span>Items:</span>
                <span className='price-bill'>${itemsPrice}</span>
              </div>
              <div className="item-bill">
                <span>Tax:</span>
                <span className='price-tax'>${taxPrice}</span>
              </div>
              <div className="item-bill">
                <span>Shipping:</span>
                <span className='price-shipping'>${shippingPrice}</span>
              </div>
              <div className="item-bill">
                <span>Total:</span>
                <span className='price-total'>${totalPrice}</span>
              </div>
            </div>
            <button className='btn btn-warning w-100' onClick={handlePlaceOrder}>place order</button>
            {isLoading ? <Spin></Spin> : null}
          </div>
        </div>
      </div>
    </>
  );
}
