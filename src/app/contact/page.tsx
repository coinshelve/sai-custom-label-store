import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: `Contact Us | ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">Contact Us</h1>
      <p className="mt-2 text-sm text-stone-600">
        Questions about an order, a custom quote, or bulk pricing? Reach out —
        we usually reply within a few hours.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">WhatsApp</h3>
          <p className="mt-1 text-sm text-stone-600">Fastest way to reach us</p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            Chat with us
          </a>
        </div>

        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">Email</h3>
          <p className="mt-1 text-sm text-stone-600">
            <a
              href="mailto:hello@sailabelstore.example"
              className="hover:text-brand-700"
            >
              hello@sailabelstore.example
            </a>
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 p-5">
          <h3 className="text-sm font-semibold text-stone-900">
            Business Hours
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Mon – Sat, 9:00 AM – 7:00 PM IST
          </p>
        </div>
      </div>

      <ContactForm whatsappNumber={siteConfig.whatsappNumber} />
    </div>
  );
}
