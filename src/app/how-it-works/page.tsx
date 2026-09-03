import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `How It Works | ${siteConfig.name} – Label Printing Process`,
};

const steps = [
  {
    title: "Pick your product & quantity",
    body: "Browse a category or search, choose the quantity tier that fits your order, and add it to your cart.",
  },
  {
    title: "Share your artwork",
    body: "Send your design file over WhatsApp or email after checkout. Not ready with artwork yet? Message us and we'll help.",
  },
  {
    title: "We print & finish",
    body: "Your order goes through our in-house print floor — cut, finished, and quality-checked before it ships.",
  },
  {
    title: "Delivered to your door",
    body: "Track your order from My Account. We currently deliver across India only.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">How It Works</h1>
      <p className="mt-2 text-sm text-stone-600">
        From order to delivery in four simple steps.
      </p>

      <ol className="mt-10 space-y-8">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-stone-600">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-sm text-stone-600">
        Questions about artwork or an existing order?{" "}
        <Link href="/contact" className="text-brand-700 hover:underline">
          Contact us
        </Link>{" "}
        and we&rsquo;ll help directly.
      </p>
    </div>
  );
}
