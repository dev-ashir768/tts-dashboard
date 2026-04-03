import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const POST = async (request: NextRequest) => {
  try {
    const { amount } = await request.json();

    const paymentintent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      status: 1,
      message: "Payment Intent Created Successfully",
      payload: { clientSecret: paymentintent.client_secret },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 0,
        message: `Internal Server Error: ${error}`,
        payload: {},
      },
      { status: 500 },
    );
  }
};
