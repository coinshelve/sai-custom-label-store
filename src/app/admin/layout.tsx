import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-stone-200 bg-stone-50">
        <nav className="mx-auto flex max-w-4xl gap-6 px-6 py-3 text-sm font-medium text-stone-600">
          <Link href="/admin" className="hover:text-brand-700">
            Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-brand-700">
            Products
          </Link>
          <Link href="/admin/categories" className="hover:text-brand-700">
            Categories
          </Link>
          <Link href="/admin/orders" className="hover:text-brand-700">
            Orders
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
