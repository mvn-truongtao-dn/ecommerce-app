import { Breadcrumb, Button, Col, Form, Input, Radio, Row, Steps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layout/Header';
import StepComponent from '../../components/step';
import { SavePaymentMethod } from '../../store/productSlice';
import { RootState } from '../../store/store';

export interface PayMethodPageProps {
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
export default function PayMethodPage(props: PayMethodPageProps) {
  const shippingAddress = useSelector((state: RootState) => state.products.cart.shippingAddress);
  const paymentMethod = useSelector((state: RootState) => state.products.cart.paymentMethod);
  const router = useRouter();

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push('/shipping');
  //   } else {
  //     // setPaymentMethod(Cookies.get('paymentMethod') || '');
  //   }
  // }, []);
  console.log(shippingAddress.address);
  const [infoAddress, setInfoAddress] = useState<any>();
  const { Step } = Steps;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    else {

    }
    form.setFieldsValue({
      paymentMethod: paymentMethod.paymentMethod
    })
  }, []);
  const onFinish = (values: any) => {
    console.log(values);
    dispatch(SavePaymentMethod(values));
    router.push('/placeorder')
  }

  return (
    <div>
      <Header></Header>
      <div className="container">
        <StepComponent id={2} />
        <div>
          <Row className='mb-20'>
            <Col span={4} offset={4}>
              {/* <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link href="/shipping">
                    <a className='link-comeback'>
                      <LeftOutlined className='icon' /> shipping
                    </a>
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb> */}
              <h2>Payment Method</h2>
            </Col>
          </Row>
          <Form {...layout} form={form} name="payment-form" onFinish={onFinish}>
            <Form.Item name="paymentMethod" label="Payment" className='custom'>
              <Radio.Group className='custom'>
                <Radio value="paypal">PayPal</Radio>
                <Radio value="stripe">Stripe</Radio>
                <Radio value="cash">Cash</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="ghost" htmlType="reset">
                <Link href="/shipping">
                  <a>
                    Cancel
                  </a>
                </Link>
              </Button>
            </Form.Item>
          </Form>

        </div>

      </div>
    </div>
  );
}
