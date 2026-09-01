import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Stand-in clips until real product videos are shot — swap the files in
// public/videos/ (see README note there) and this list keeps working as-is.
const SAMPLE_CLIPS = ["/videos/sample-1.mp4", "/videos/sample-2.mp4"];

export async function WatchAndBuy() {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: { variants: { orderBy: { quantity: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-bold text-stone-900">Watch &amp; Buy</h2>
      <p className="mt-1 text-sm text-stone-500">
        See it before you print it.
      </p>

      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {products.map((product, i) => {
          const cheapest = product.variants[0];
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-stone-200 hover:border-brand-400 hover:shadow-sm"
            >
              <div className="relative aspect-[9/16] w-full bg-stone-900">
                <video
                  className="h-full w-full object-cover"
                  src={SAMPLE_CLIPS[i % SAMPLE_CLIPS.length]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-medium text-stone-800 group-hover:text-brand-700">
                  {product.name}
                </p>
                {cheapest && (
                  <p className="text-xs text-stone-500">
                    From ₹{cheapest.price.toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
