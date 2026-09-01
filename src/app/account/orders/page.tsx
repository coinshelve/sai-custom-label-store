import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function OrderHistoryPage() {
  const session = await auth();

  const orders = session?.user?.email
    ? await prisma.order.findMany({
        where: { customer: { email: session.user.email } },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">Order History</h1>

      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500">No orders yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-stone-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/order-confirmation/${order.id}`}
                  className="text-sm font-medium text-brand-700 hover:underline"
                >
                  Order #{order.id.slice(-8)}
                </Link>
                <span className="text-xs font-medium uppercase text-stone-500">
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                {order.items.map((i) => i.product.name).join(", ")}
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-900">
                ₹{order.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
