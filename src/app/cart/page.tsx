"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-900">Your Cart</h1>

      <ul className="mt-6 divide-y divide-stone-200">
        {items.map((item) => (
          <li key={item.variantId} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 shrink-0 rounded-md bg-stone-100" />
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">
                {item.productName}
              </p>
              <p className="text-xs text-stone-500">Qty tier: {item.variantLabel}</p>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.variantId, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 rounded border border-stone-300 px-2 py-1 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-semibold text-stone-900">
              ₹{(item.price * item.qty).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-6">
        <p className="text-base font-semibold text-stone-900">
          Total: ₹{total.toFixed(2)}
        </p>
        <Link
          href="/checkout"
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
