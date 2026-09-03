import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `About Us | Custom Label Printing in India – ${siteConfig.name}`,
  description: `${siteConfig.name} designs and prints custom labels, stickers, packaging, and marketing stationery for brands across India, from our print floor in ${siteConfig.location}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">About Us</h1>
      <p className="mt-4 text-sm leading-6 text-stone-600">
        {siteConfig.name} prints custom labels, stickers, packaging, and
        marketing stationery for brands across India — from single-run
        samples to large production orders. Every job runs through our own
        print floor in {siteConfig.location}, so what you see in the proof is
        what ships.
      </p>
      <p className="mt-4 text-sm leading-6 text-stone-600">
        We work with food and beverage brands, cosmetics and personal care
        labels, pharma and nutraceutical packaging, D2C sellers shipping
        direct to customers, and cafés and bakeries — printing everything
        from tamper-evident labels to foil-finished packaging sleeves.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">
            In-house printing
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            No outsourcing — every order is printed and finished on our own
            floor for consistent quality.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">
            Pan-India delivery
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            We currently ship across India only — no international shipping
            at this time.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">
            Real support
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Reach a real person on WhatsApp or email for artwork help,
            pricing, or order status.
          </p>
        </div>
      </div>
    </div>
  );
}
