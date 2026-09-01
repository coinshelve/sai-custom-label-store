"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export function CartLink() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0),
  );

  return (
    <Link
      href="/cart"
      className="text-sm font-medium text-stone-700 hover:text-brand-700"
    >
      Cart ({count})
    </Link>
  );
}
