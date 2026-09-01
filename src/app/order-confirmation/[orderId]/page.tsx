import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } }, address: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      {order.status === "PAID" ? (
        <>
          <h1 className="text-2xl font-bold text-stone-900">
            Thank you! Your order is confirmed.
          </h1>
          <p className="mt-2 text-sm text-stone-500">Order ID: {order.id}</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-stone-900">
            Order received — payment pending
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Order ID: {order.id} · Status: {order.status}
          </p>
        </>
      )}

      <ul className="mt-8 space-y-3 text-left">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-base font-semibold">
        <span>Total</span>
        <span>₹{order.total.toFixed(2)}</span>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
