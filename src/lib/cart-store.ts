import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, qty: i.qty + item.qty }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      updateQty: (variantId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, qty } : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "sai-label-store-cart" },
  ),
);
