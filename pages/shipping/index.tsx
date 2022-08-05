import { Breadcrumb, Col, Row, Steps } from 'antd';
import { useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SaveShippingAddress } from '../../store/productSlice';
import { RootState } from '../../store/store';
import { useRouter } from 'next/router';
import StepComponent from '../../components/step';

export interface ShippingPageProps {
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export default function ShippingPage(props: ShippingPageProps) {
  const shippingAddress = useSelector((state: RootState) => state.products.cart.shippingAddress);
  const { Step } = Steps;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: any) => {
    dispatch(SaveShippingAddress(values))
    router.push('/paymethod');
  };
  useEffect(() => {
    form.setFieldsValue({
      fullname: shippingAddress.fullname,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalcode: shippingAddress.postalcode,
      country: shippingAddress.country
    });
  }, [])
  console.log(shippingAddress);

  return (
    <>
      <Header></Header>
      <main className='page-main'>
        <div className="container">
          <StepComponent id={1} />

          <div>
            <Row>
              <Col span={4} offset={4}>
                <h2>Shipping Address</h2>
              </Col>
            </Row>
            <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name={['fullname']} label="Fullname" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['address']} label="Address" >
                <Input />
              </Form.Item>
              <Form.Item name={['city']} label="City">
                <Input />
              </Form.Item>
              <Form.Item name={['postalcode']} label="Postal Code">
                <Input />
              </Form.Item>
              <Form.Item name={['country']} label="Country">
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
