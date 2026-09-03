import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function RelatedProducts({
  categoryId,
  excludeProductId,
}: {
  categoryId: string;
  excludeProductId: string;
}) {
  let products = await prisma.product.findMany({
    where: { published: true, categoryId, id: { not: excludeProductId } },
    include: {
      variants: { orderBy: { quantity: "asc" }, take: 1 },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
    take: 4,
  });

  if (products.length === 0) {
    products = await prisma.product.findMany({
      where: { published: true, id: { not: excludeProductId } },
      include: {
        variants: { orderBy: { quantity: "asc" }, take: 1 },
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
      },
      take: 4,
    });
  }

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="text-lg font-semibold text-stone-900">
        Related Products
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => {
          const cheapest = product.variants[0];
          const image = product.images[0];
          return (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group rounded-lg border border-stone-200 p-4 transition hover:border-brand-400 hover:shadow-sm"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-stone-100">
                {image && (
                  <Image
                    src={image.url}
                    alt={image.altText ?? product.name}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="mt-3 text-sm font-medium text-stone-800 group-hover:text-brand-700">
                {product.name}
              </h3>
              {cheapest && (
                <p className="mt-1 text-xs text-stone-500">
                  From ₹{cheapest.price.toFixed(2)}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
