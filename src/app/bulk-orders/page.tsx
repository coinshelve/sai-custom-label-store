import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Bulk Orders | ${siteConfig.name} – Volume Pricing`,
};

export default function BulkOrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">Bulk Orders</h1>
      <p className="mt-4 text-sm leading-6 text-stone-600">
        Ordering in volume? Every product page shows quantity tiers with a
        lower per-unit price at higher volumes — but for large production
        runs, custom finishes, or recurring orders, message us directly and
        we&rsquo;ll work out pricing and turnaround for your exact requirement.
      </p>

      <div className="mt-8 rounded-lg border border-stone-200 p-6">
        <h2 className="text-sm font-semibold text-stone-900">
          What to include when you reach out
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-600">
          <li>Product type and approximate quantity</li>
          <li>Any specific material, finish, or size requirements</li>
          <li>Your artwork file, or a description if it&rsquo;s not ready yet</li>
          <li>Delivery location and timeline</li>
        </ul>
      </div>

      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi Custom Label Store, I'd like to place a bulk order.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Discuss a Bulk Order on WhatsApp
      </a>
    </div>
  );
}
