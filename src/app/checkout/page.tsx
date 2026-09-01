"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: {
            line1: form.line1,
            line2: form.line2 || undefined,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          items: items.map((item) => ({
            variantId: item.variantId,
            qty: item.qty,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not start checkout.");
      }

      const data = await res.json();

      const razorpay = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Sai Custom Label Store",
        description: "Order payment",
        order_id: data.razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            clear();
            router.push(`/order-confirmation/${data.orderId}`);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="mx-auto grid max-w-4xl gap-8 px-6 py-12 sm:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold text-stone-900">Shipping Details</h1>

          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Address line 1"
            value={form.line1}
            onChange={(e) => update("line1", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="Address line 2 (optional)"
            value={form.line2}
            onChange={(e) => update("line2", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="rounded border border-stone-300 px-3 py-2 text-sm"
            />
            <input
              required
              placeholder="State"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              className="rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <input
            required
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value)}
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {submitting ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
          </button>
        </form>

        <div>
          <h2 className="text-lg font-semibold text-stone-900">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.variantId} className="flex justify-between text-sm">
                <span>
                  {item.productName} ({item.variantLabel}) × {item.qty}
                </span>
                <span className="font-medium">
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
