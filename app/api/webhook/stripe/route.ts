import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import apiClient from "@/lib/axios";
// import { API_ENDPOINTS } from "@/lib/constants";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const { order_id, user_id, acno, api_key } = session.metadata;

    if (order_id) {
      try {
        await apiClient.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            order_id: parseInt(order_id),
            user_id: parseInt(user_id),
            acno: acno,
            transaction_id: session.id,
            amount_date: new Date().toISOString().split("T")[0],
            parent_id: parseInt(user_id),
          },
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
            },
          },
        );

        console.log(
          `Order ${order_id} MOCK confirmed via Stripe webhook with transaction ${session.id}`,
        );
      } catch (error) {
        console.error(`Error confirming order ${order_id}:`, error);
        return NextResponse.json(
          { error: "Failed to confirm order" },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
