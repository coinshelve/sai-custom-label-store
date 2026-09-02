import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getRazorpay } from "@/lib/razorpay";

const checkoutSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(4),
  }),
  items: z
    .array(
      z.object({
        variantId: z.string(),
        qty: z.number().int().min(1),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  const body = checkoutSchema.parse(await request.json());

  const variants = await prisma.productVariant.findMany({
    where: { id: { in: body.items.map((i) => i.variantId) } },
  });

  if (variants.length !== body.items.length) {
    return NextResponse.json(
      { error: "One or more items are no longer available." },
      { status: 400 },
    );
  }

  const lineItems = body.items.map((item) => {
    const variant = variants.find((v) => v.id === item.variantId)!;
    return { variant, qty: item.qty };
  });

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.variant.price * item.qty,
    0,
  );
  const total = subtotal; // shipping/tax rules to be added later

  // Wrapped in a transaction so a failed Razorpay call (e.g. bad/placeholder
  // keys) rolls back the customer/address/order rows instead of leaving a
  // dangling incomplete order behind.
  const result = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: { email: body.email },
      update: { name: body.name, phone: body.phone },
      create: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        // Guest checkout: no login yet, placeholder hash until the account flow (Phase 5) lets them set a real password.
        passwordHash: "guest-checkout",
      },
    });

    const address = await tx.address.create({
      data: {
        customerId: customer.id,
        line1: body.address.line1,
        line2: body.address.line2,
        city: body.address.city,
        state: body.address.state,
        pincode: body.address.pincode,
        phone: body.phone,
      },
    });

    const order = await tx.order.create({
      data: {
        customerId: customer.id,
        addressId: address.id,
        subtotal,
        total,
        status: "PENDING",
        items: {
          create: lineItems.map((item) => ({
            productId: item.variant.productId,
            variantId: item.variant.id,
            quantity: item.qty,
            price: item.variant.price,
          })),
        },
      },
    });

    const razorpayOrder = await getRazorpay().orders.create({
      amount: Math.round(total * 100), // paise
      currency: "INR",
      receipt: order.id,
    });

    await tx.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return { orderId: order.id, razorpayOrder };
  });

  return NextResponse.json({
    orderId: result.orderId,
    razorpayOrderId: result.razorpayOrder.id,
    amount: result.razorpayOrder.amount,
    currency: result.razorpayOrder.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
