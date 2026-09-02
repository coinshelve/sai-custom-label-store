import Razorpay from "razorpay";

let client: Razorpay | null = null;

// Constructed lazily (on first actual use) instead of at module load —
// building/importing this module must not throw just because the Razorpay
// env vars aren't set yet (e.g. during Vercel's build-time page-data
// collection, before secrets are configured).
export function getRazorpay() {
  if (!client) {
    client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return client;
}
