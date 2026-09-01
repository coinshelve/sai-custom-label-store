"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function AccountLink() {
  const { data: session } = useSession();

  return (
    <Link
      href={session ? "/account" : "/login"}
      className="text-sm font-medium text-stone-700 hover:text-brand-700"
    >
      {session ? "Account" : "Log In"}
    </Link>
  );
}
