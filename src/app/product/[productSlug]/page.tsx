import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: productSlug, published: true },
    include: {
      category: true,
      variants: { orderBy: { quantity: "asc" } },
    },
  });

  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2">
      <div className="aspect-square w-full rounded-lg bg-stone-100" />

      <div>
        <p className="text-sm text-brand-700">{product.category.name}</p>
        <h1 className="mt-1 text-2xl font-bold text-stone-900">
          {product.name}
        </h1>
        {product.description && (
          <p className="mt-3 text-sm text-stone-600">{product.description}</p>
        )}

        <ProductPurchasePanel
          productSlug={product.slug}
          productName={product.name}
          variants={product.variants.map((v) => ({
            id: v.id,
            label: v.label,
            price: v.price,
          }))}
        />
      </div>
    </div>
  );
}
