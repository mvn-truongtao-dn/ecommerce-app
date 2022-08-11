import * as React from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
export interface StripeComponentProps {
}

// pk_test_51KBZp9Kxe01HbqlS3h06TjTyHDUlrpXQO0N8Aenhed3V6o6Qbhng7z367zSM9UyfirZ734KYG0f4j7Kmsr4SS6R300EirHpsep
//sk_test_51KBZp9Kxe01HbqlSIwW4g1qBWG1lpxqqQxLOmeH0dI70USq4LNwvmGWixtjE4nek7H3qiKnW4RtEUvBE8kdubiwU004ibYqEzs
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= "pk_test_51KBZp9Kxe01HbqlS3h06TjTyHDUlrpXQO0N8Aenhed3V6o6Qbhng7z367zSM9UyfirZ734KYG0f4j7Kmsr4SS6R300EirHpsep"
const STRIPE_SECRET_KEY= "sk_test_51KBZp9Kxe01HbqlSIwW4g1qBWG1lpxqqQxLOmeH0dI70USq4LNwvmGWixtjE4nek7H3qiKnW4RtEUvBE8kdubiwU004ibYqEzs"
let stripePromise: Promise<Stripe | null>;

export default function StripeComponent(props: StripeComponentProps) {
    return (
        <div>

        </div>
    );
}
