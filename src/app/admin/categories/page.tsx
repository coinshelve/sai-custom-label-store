import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/app/admin/actions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Categories</h1>

      <form action={createCategory} className="mt-6 flex flex-wrap gap-2">
        <input
          required
          name="name"
          placeholder="Category name"
          className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm"
        />
        <input
          name="description"
          placeholder="Description (optional)"
          className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Add
        </button>
      </form>

      <ul className="mt-8 divide-y divide-stone-200">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-stone-900">{category.name}</p>
              <p className="text-xs text-stone-500">
                {category._count.products} product(s) · /{category.slug}
              </p>
            </div>
            <form action={deleteCategory}>
              <input type="hidden" name="id" value={category.id} />
              <button
                type="submit"
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
