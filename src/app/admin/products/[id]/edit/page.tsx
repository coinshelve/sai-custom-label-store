import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        variants: { orderBy: { quantity: "asc" } },
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Edit Product</h1>
      <div className="mt-6">
        <ProductForm
          categories={categories}
          product={{
            id: product.id,
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            published: product.published,
            variants: product.variants.map((v) => ({
              label: v.label,
              quantity: v.quantity,
              price: v.price,
            })),
            imageUrl: product.images[0]?.url ?? null,
          }}
        />
      </div>
    </div>
  );
}
