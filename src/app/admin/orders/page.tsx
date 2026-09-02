import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/app/admin/actions";

const STATUSES = ["PENDING", "PAID", "FAILED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { customer: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Orders</h1>

      <ul className="mt-8 divide-y divide-stone-200">
        {orders.map((order) => (
          <li key={order.id} className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-stone-900">
                  #{order.id.slice(-8)} — {order.customer.name} ({order.customer.email})
                </p>
                <p className="text-xs text-stone-500">
                  {order.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-900">
                  ₹{order.total.toFixed(2)}
                </span>
                <form action={updateOrderStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="rounded border border-stone-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white hover:bg-brand-700"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}

        {orders.length === 0 && (
          <p className="py-6 text-sm text-stone-500">No orders yet.</p>
        )}
      </ul>
    </div>
  );
}
