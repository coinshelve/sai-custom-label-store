import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `FAQs | ${siteConfig.name} – Printing, Delivery & Artwork`,
};

const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "Most labels and stickers start from as low as 25–100 pieces, shown as quantity tiers on each product page. Larger tiers get a lower per-unit price.",
  },
  {
    q: "Do you ship internationally?",
    a: "No — we currently ship across India only. We don't offer international shipping at this time.",
  },
  {
    q: "How do I send my artwork?",
    a: "Add your product to cart and check out — you can also message us your artwork file directly on WhatsApp before or after placing the order.",
  },
  {
    q: "Can I order a sample before a bulk run?",
    a: "Yes. Most products let you choose a smaller quantity tier to test the finish and print quality before committing to a bulk order.",
  },
  {
    q: "How long does printing and delivery take?",
    a: "Typical turnaround is 2–4 business days for printing, plus shipping time. Exact timelines depend on the product and quantity — ask us on WhatsApp for a specific order.",
  },
  {
    q: "Is GST included in the price?",
    a: "Prices are shown as listed on each product page. GST details are shown clearly at checkout before you pay.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards, and net banking via Razorpay.",
  },
  {
    q: "Can I track my order?",
    a: "Yes — log in to My Account to see your order status and history at any point after checkout.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">
        Frequently Asked Questions
      </h1>

      <div className="mt-8 divide-y divide-stone-200">
        {faqs.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-900">
              {item.q}
              <span className="ml-4 shrink-0 text-stone-400 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm text-stone-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
