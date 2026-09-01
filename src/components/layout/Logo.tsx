import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * Roll-of-labels icon + script wordmark, matching the brand logo
 * (magenta/plum roll with a cream core, peeling label flap).
 */
function RollIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M18 32 C9 39, 7 50, 14 57 C19 61, 26 59, 25 52 C24 47, 19 45, 18 32 Z"
        fill="var(--color-brand-700)"
      />
      <circle cx="33" cy="22" r="19" fill="var(--color-brand-700)" />
      <circle cx="33" cy="22" r="7.5" fill="var(--color-accent-400)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <RollIcon className="h-9 w-9" />
      <span className="font-script text-2xl leading-none text-brand-700 sm:text-[1.75rem]">
        {siteConfig.shortName}
      </span>
    </Link>
  );
}
