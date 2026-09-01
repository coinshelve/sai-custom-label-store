import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold text-stone-900">My Account</h1>
      <p className="mt-2 text-sm text-stone-600">
        {session?.user?.name} · {session?.user?.email}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/account/orders"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Order History
        </Link>
        {session?.user?.role === "admin" && (
          <Link
            href="/admin"
            className="rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Admin Dashboard
          </Link>
        )}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
