import { Hero } from "@/components/home/Hero";
import { WatchAndBuy } from "@/components/home/WatchAndBuy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

// Queries the database on every render instead of at build time — the
// catalog changes via the admin panel and there's no build-time DB access
// on Vercel until a database is provisioned and connected anyway.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <WatchAndBuy />
      <FeaturedProducts />
    </>
  );
}
