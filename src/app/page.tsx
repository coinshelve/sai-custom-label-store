import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WatchAndBuy } from "@/components/home/WatchAndBuy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { UseCaseGrid } from "@/components/home/UseCaseGrid";

// Queries the database on every render instead of at build time — the
// catalog changes via the admin panel and there's no build-time DB access
// on Vercel until a database is provisioned and connected anyway.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <WatchAndBuy />
      <FeaturedProducts />
      <UseCaseGrid />
    </>
  );
}
