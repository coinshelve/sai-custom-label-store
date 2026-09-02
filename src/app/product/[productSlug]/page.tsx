import { notFound } from "next/navigation";
import Image from "next/image";
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
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
  });

  if (!product) notFound();

  const image = product.images[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100">
        {image && (
          <Image
            src={image.url}
            alt={image.altText ?? product.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

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
