import { Steps } from 'antd';
import * as React from 'react';

export interface StepComponentProps {
  id: number
}

const { Step } = Steps
export default function StepComponent({ id }: StepComponentProps) {
  return (
    <div>
      <Steps size="default" current={id}>
        <Step title="Login" />
        <Step title="Shipping" />
        <Step title="Pay Method" />
        <Step title="Place Order" />
      </Steps>
    </div>
  );
}
