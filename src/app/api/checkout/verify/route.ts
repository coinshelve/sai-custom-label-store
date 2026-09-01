import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(request: Request) {
  const body = verifySchema.parse(await request.json());

  const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
    .digest("hex");

  const isValid = expectedSignature === body.razorpay_signature;

  const order = await prisma.order.findFirst({
    where: { razorpayOrderId: body.razorpay_order_id },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  await prisma.order.update({
    where: { id: order.id },
    data: {
      status: isValid ? "PAID" : "FAILED",
      razorpayPaymentId: body.razorpay_payment_id,
    },
  });

  if (!isValid) {
    return NextResponse.json({ error: "Signature verification failed." }, { status: 400 });
  }

  return NextResponse.json({ orderId: order.id });
}
