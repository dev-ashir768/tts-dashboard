import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { order_id, inventory_items, user_id, acno, api_key } =
      await req.json();

    if (!order_id || !inventory_items || !Array.isArray(inventory_items)) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: inventory_items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.sku_name,
            description: `SKU: ${item.sku_code}`,
            images: item.image
              ? [
                  `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL}/user_1/${item.image}`,
                ]
              : [],
          },
          unit_amount: item.amount * 100,
        },
        quantity: item.quantity,
      })),
      metadata: {
        order_id: order_id.toString(),
        user_id: user_id?.toString() || "",
        acno: acno || "",
        api_key: api_key || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong creating checkout session" },
      { status: 500 },
    );
  }
}
