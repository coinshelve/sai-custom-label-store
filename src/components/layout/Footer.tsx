import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-script text-2xl text-brand-800">
            {siteConfig.name}
          </h3>
          <p className="mt-2 text-sm text-stone-600">{siteConfig.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            {siteConfig.categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/labels/${category.slug}`}
                  className="hover:text-brand-700"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Help</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>
              <Link href="/account" className="hover:text-brand-700">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="hover:text-brand-700">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-700">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>hello@sailabelstore.example</li>
            <li>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                className="hover:text-brand-700"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
