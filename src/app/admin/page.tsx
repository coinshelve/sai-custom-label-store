import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, paidTotal] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ where: { status: "PAID" }, _sum: { total: true } }),
  ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Orders", value: orderCount },
    { label: "Revenue (paid)", value: `₹${(paidTotal._sum.total ?? 0).toFixed(2)}` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-stone-200 p-4">
            <p className="text-sm text-stone-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-stone-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Manage Products
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
