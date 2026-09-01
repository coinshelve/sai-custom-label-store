import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/app/admin/actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          New Product
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-stone-200">
        {products.map((product) => (
          <li key={product.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-stone-900">
                {product.name}{" "}
                {!product.published && (
                  <span className="ml-1 rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-500">
                    Draft
                  </span>
                )}
              </p>
              <p className="text-xs text-stone-500">
                {product.category.name} · {product.variants.length} variant(s) · from ₹
                {product.basePrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-xs font-medium text-brand-700 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
