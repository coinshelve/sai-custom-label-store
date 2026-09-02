import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        where: { published: true },
        include: {
          variants: { orderBy: { quantity: "asc" } },
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">{category.name}</h1>
      {category.description && (
        <p className="mt-1 text-sm text-stone-500">{category.description}</p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {category.products.map((product) => {
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
            </Link>
          );
        })}

        {category.products.length === 0 && (
          <p className="col-span-full text-sm text-stone-500">
            No products in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
