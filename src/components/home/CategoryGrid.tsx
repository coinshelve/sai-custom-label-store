import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function CategoryGrid() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-bold text-stone-900">Shop by Category</h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/labels/${category.slug}`}
            className="group text-center"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-stone-100">
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                  className="object-cover transition group-hover:scale-105"
                />
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-stone-800 group-hover:text-brand-700">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
