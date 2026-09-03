import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { seedData } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ useCaseSlug: string }>;
}) {
  const { useCaseSlug } = await params;
  const useCase = seedData.useCases.find((u) => u.slug === useCaseSlug);
  return { title: useCase ? `${useCase.name} | Custom Label Store` : "Not found" };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ useCaseSlug: string }>;
}) {
  const { useCaseSlug } = await params;
  const useCase = seedData.useCases.find((u) => u.slug === useCaseSlug);

  if (!useCase) notFound();

  const products = await prisma.product.findMany({
    where: { published: true, slug: { in: useCase.productSlugs } },
    include: {
      variants: { orderBy: { quantity: "asc" }, take: 1 },
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-4 text-xs text-stone-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>{" "}
        / <span className="text-stone-700">{useCase.name}</span>
      </nav>

      <h1 className="text-2xl font-bold text-stone-900">{useCase.name}</h1>
      <p className="mt-1 text-sm text-stone-500">
        Labels and packaging picked for {useCase.name.toLowerCase()}.
      </p>

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
                  From ₹{cheapest.price.toFixed(2)}
                </p>
              )}
            </Link>
          );
        })}

        {products.length === 0 && (
          <p className="col-span-full text-sm text-stone-500">
            No products found for this industry yet.
          </p>
        )}
      </div>
    </div>
  );
}
