import { Image, Spin } from 'antd';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import Header from '../../components/layout/Header';
import StepComponent from '../../components/step';
import { useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PayloadAction } from '@reduxjs/toolkit';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from 'react';
const initialOptions = {
  currency: "USD",
  intent: "capture",
  "client-id": "ATlx1DWUI5l07_CLshplxlLtkCGhS892C8ur-s_Iy4OPk05t95bJwWtVhlfUQV2X5N9ANjWa-6YPvKRm",
};
export interface OrdersPageProps {
  order: any
}

export default function OrdersPage({ order }: OrdersPageProps) {
  console.log(process.env.PAYPAL_CLIENT_ID);
  const router = useRouter();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState<string | unknown>();
  const [{ isPending }] = usePayPalScriptReducer();
  if (router.isFallback) {
    return <><Spin></Spin></>
  }
  const handleApprove = () => {
    setPaidFor(true);
  }
  if (paidFor) {
    alert("Thank you for your purchase!");
  }
  if (error) {
    alert(error);
  }
  console.log(isPending);

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
              <p> {order.shippingAddress.fullname}, {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}</p>
              <p>Status:{' '}
                {order.isDelivered
                  ? `delivered at ${order.deliveredAt}`
                  : 'not delivered'}</p>
            </div>
            <div className='info-payment-method block-info-placeorder'>
              <h3>Payment Method</h3>
              <p>{order?.paymentMethod.paymentMethod}</p>
              <p>Status:{' '}{order.isPaid
                ? `paid at ${order.paidAt}`
                : 'not paid'}</p>
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
                    order.cartItems?.map((item: any) =>
                      <tr key={item.id}>
                        <td>
                          <Image src={item.thumbnail} alt={item.title} width={200} height={200} className="custom-image" />
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
                <span className='price-bill'>${order.itemsPrice}</span>
              </div>
              <div className="item-bill">
                <span>Tax:</span>
                <span className='price-tax'>${order.taxPrice}</span>
              </div>
              <div className="item-bill">
                <span>Shipping:</span>
                <span className='price-shipping'>${order.shippingPrice}</span>
              </div>
              <div className="item-bill">
                <span>Total:</span>
                <span className='price-total'>${order.totalPrice}</span>
              </div>
              {/* {
                !order.isPaid && (
                  <>
                    {
                      isPending ? (<Spin />) : (
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                      )
                    }
                  </>
                )
              } */}
              {
                order?.paymentMethod.paymentMethod === "stripe" ? (<h1>Stripe</h1>) : (
                  <PayPalScriptProvider options={initialOptions}>
                    {isPending ? <Spin></Spin> : null}

                    <PayPalButtons
                      // onClick={(data, actions) => {
                      //   //Validate on button Click, client or server side
                      //   const hasAlreadyBoughtCourse = false;
                      //   if (hasAlreadyBoughtCourse) {
                      //     setError("You already bought this course. Go to your account to view list of course");
                      //     return actions.reject();
                      //   } else {
                      //     return actions.resolve();
                      //   }

                      // }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.totalPrice}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions: any) => {
                        return actions.order.capture().then(async (details: any) => {
                          console.log(details);
                          order.isPaid = true;
                          order.paidAt = Date.now();
                          await axios.put(`https://6274e2bf345e1821b230ebee.mockapi.io/orders/${order.id}`, {
                            isPaid: true,
                            paidAt: Date.now()
                          })
                          await axios.post('https://6274e2bf345e1821b230ebee.mockapi.io/paypal', { details });
                          router.push('/list-order');
                        });
                      }}
                      onCancel={() => {
                        //Display cancel message, modal or redirect user to cancel page or back to cart

                      }}
                    // onError={(err) => {
                    //   setError(err);
                    //   console.error("PayPal Checkout onError", err);
                    // }}
                    />

                  </PayPalScriptProvider>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/orders');
//   const data = await res.json();
//   return {
//     paths: data.map((order: any) => ({ params: { orderId: order.id.toString() } })),
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps<OrdersPageProps> = async (context: GetStaticPropsContext) => {
// const orderId = context.params?.orderId;
// const res = await fetch(`https://6274e2bf345e1821b230ebee.mockapi.io/orders/${orderId}`);
// const data = await res.json();
// return {
//   props: {
//     order: data
//   }
// }
// }
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/orders');
  const data = (await res.json());
  return {
    paths: data.map((order: any) => ({ params: { orderId: order.id } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<OrdersPageProps> = async (
  context: GetStaticPropsContext
) => {
  const orderId = context.params?.orderId;
  const res = await fetch(`https://6274e2bf345e1821b230ebee.mockapi.io/orders/${orderId}`);
  const data = (await res.json());
  return {
    props: {
      order: data
    }
  }
}