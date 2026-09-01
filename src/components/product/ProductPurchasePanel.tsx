"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

interface Variant {
  id: string;
  label: string;
  price: number;
}

export function ProductPurchasePanel({
  productSlug,
  productName,
  variants,
}: {
  productSlug: string;
  productName: string;
  variants: Variant[];
}) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  if (!selected) {
    return (
      <p className="mt-6 text-sm text-stone-500">
        This product has no available quantity options right now.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-2xl font-bold text-stone-900">
        ₹{selected.price.toFixed(2)}
      </p>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-stone-700">
          Quantity
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedId(variant.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                variant.id === selected.id
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-stone-300 text-stone-700 hover:border-brand-400"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() =>
          addItem({
            productSlug,
            productName,
            variantId: selected.id,
            variantLabel: selected.label,
            price: selected.price,
            qty: 1,
          })
        }
        className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 sm:w-auto"
      >
        Add to Cart
      </button>
      <button
        type="button"
        onClick={() => {
          addItem({
            productSlug,
            productName,
            variantId: selected.id,
            variantLabel: selected.label,
            price: selected.price,
            qty: 1,
          });
          router.push("/cart");
        }}
        className="mt-6 ml-3 w-full rounded-full border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 sm:w-auto"
      >
        Buy Now
      </button>
    </div>
  );
}
