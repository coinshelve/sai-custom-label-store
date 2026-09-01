"use client";

import { useState } from "react";
import { saveProduct } from "@/app/admin/actions";

interface Tier {
  label: string;
  quantity: number;
  price: number;
}

export function ProductForm({
  categories,
  product,
}: {
  categories: { id: string; name: string }[];
  product?: {
    id: string;
    name: string;
    description: string | null;
    categoryId: string;
    published: boolean;
    variants: Tier[];
  };
}) {
  const [tiers, setTiers] = useState<Tier[]>(
    product?.variants.length
      ? product.variants
      : [{ label: "", quantity: 0, price: 0 }],
  );

  return (
    <form action={saveProduct} className="space-y-4">
      {product && <input type="hidden" name="id" value={product.id} />}

      <input
        required
        name="name"
        placeholder="Product name"
        defaultValue={product?.name}
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
      />

      <textarea
        name="description"
        placeholder="Description"
        defaultValue={product?.description ?? ""}
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
        rows={3}
      />

      <select
        required
        name="categoryId"
        defaultValue={product?.categoryId}
        className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product?.published ?? true}
        />
        Published
      </label>

      <div>
        <p className="text-sm font-medium text-stone-700">Quantity tiers</p>
        <div className="mt-2 space-y-2">
          {tiers.map((tier, i) => (
            <div key={i} className="flex gap-2">
              <input
                name="tierLabel"
                placeholder="Label (e.g. 250)"
                defaultValue={tier.label}
                className="flex-1 rounded border border-stone-300 px-2 py-1.5 text-sm"
              />
              <input
                name="tierQuantity"
                type="number"
                placeholder="Qty"
                defaultValue={tier.quantity || ""}
                className="w-24 rounded border border-stone-300 px-2 py-1.5 text-sm"
              />
              <input
                name="tierPrice"
                type="number"
                step="0.01"
                placeholder="Price ₹"
                defaultValue={tier.price || ""}
                className="w-28 rounded border border-stone-300 px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => setTiers((t) => t.filter((_, idx) => idx !== i))}
                className="px-2 text-sm text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setTiers((t) => [...t, { label: "", quantity: 0, price: 0 }])
          }
          className="mt-2 text-sm text-brand-700 hover:underline"
        >
          + Add tier
        </button>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Save Product
      </button>
    </form>
  );
}
