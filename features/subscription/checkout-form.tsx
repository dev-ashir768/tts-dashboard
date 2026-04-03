"use client";

import React from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { useElements } from '@stripe/react-stripe-js'
import { subscriptionService } from '@/services/subscription.service';
import { convertToSubCurrency } from "@/lib/convertToSubCurrency";

interface CheckoutFormProps {
    amount: number;
}
const CheckoutForm = ({ amount }: CheckoutFormProps) => {
    // const stripe = useStripe();
    // const elements = useElements();

    const response = subscriptionService.createCheckoutSession(convertToSubCurrency(amount))
    console.log(response)
    return (
        <>
            <form>
            </form>
        </>
    )
}

export default CheckoutForm
