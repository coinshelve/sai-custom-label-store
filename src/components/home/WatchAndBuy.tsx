import { prisma } from "@/lib/prisma";
import { WatchAndBuyGrid, type WatchAndBuyItem } from "./WatchAndBuyGrid";

const VIDEOS = Array.from(
  { length: 9 },
  (_, i) => `/videos/products/product-${i + 1}.mp4`,
);

export async function WatchAndBuy() {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: { variants: { orderBy: { quantity: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) return null;

  const items: WatchAndBuyItem[] = VIDEOS.map((video, i) => {
    const product = products[i % products.length];
    return {
      slug: product.slug,
      name: product.name,
      price: product.variants[0]?.price ?? null,
      video,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-bold text-stone-900">Watch &amp; Buy</h2>
      <p className="mt-1 text-sm text-stone-500">
        Hover to preview, click to watch — straight from our print floor.
      </p>

      <WatchAndBuyGrid items={items} />
    </section>
  );
}
