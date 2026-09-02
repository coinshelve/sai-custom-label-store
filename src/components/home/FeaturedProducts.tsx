import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      variants: { orderBy: { quantity: "asc" }, take: 1 },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <section id="featured" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-bold text-stone-900">Latest Products</h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="mt-3 text-sm font-medium text-stone-800 group-hover:text-brand-700">
                {product.name}
              </h3>
              {cheapest && (
                <p className="mt-1 text-xs text-stone-500">
                  {cheapest.label} @ Starting at{" "}
                  <span className="font-semibold text-stone-800">
                    ₹{cheapest.price.toFixed(2)}
                  </span>
                </p>
              )}
              <span className="mt-3 inline-block rounded-full bg-brand-600 px-3 py-1.5 text-xs font-medium text-white group-hover:bg-brand-700">
                View Product
              </span>
            </Link>
          );
        })}

        {products.length === 0 && (
          <p className="col-span-full text-sm text-stone-500">
            No products yet — run{" "}
            <code className="rounded bg-stone-100 px-1">npm run db:seed</code>{" "}
            to add sample products.
          </p>
        )}
      </div>
    </section>
  );
}
