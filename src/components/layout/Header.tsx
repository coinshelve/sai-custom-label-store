import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./Logo";
import { CartLink } from "./CartLink";
import { AccountLink } from "./AccountLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <form
          action="/search"
          className="hidden flex-1 items-center md:flex"
          role="search"
        >
          <input
            type="search"
            name="q"
            placeholder="Search for labels, stickers..."
            className="w-full rounded-full border border-stone-300 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </form>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 sm:flex"
          >
            WhatsApp
          </a>
          <AccountLink />
          <CartLink />
        </div>
      </div>

      <nav className="hidden border-t border-stone-100 md:block">
        <ul className="mx-auto flex max-w-7xl gap-6 px-6 py-2 text-sm font-medium text-stone-600">
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
      </nav>
    </header>
  );
}
