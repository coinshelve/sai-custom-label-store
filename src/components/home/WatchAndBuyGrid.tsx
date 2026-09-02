"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export interface WatchAndBuyItem {
  slug: string;
  name: string;
  price: number | null;
  video: string;
}

export function WatchAndBuyGrid({ items }: { items: WatchAndBuyItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  function handleEnter(i: number) {
    const video = videoRefs.current[i];
    if (video) video.play().catch(() => {});
  }

  function handleLeave(i: number) {
    const video = videoRefs.current[i];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  return (
    <>
      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {items.map((item, i) => (
          <div
            key={item.video}
            className="w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-stone-200 hover:border-brand-400 hover:shadow-sm"
          >
            <button
              type="button"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-9/16 w-full bg-stone-900"
              aria-label={`Play video for ${item.name}`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="h-full w-full object-cover"
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-9 w-9 fill-white/90 opacity-90 drop-shadow"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
            <Link href={`/product/${item.slug}`} className="block p-2">
              <p className="truncate text-xs font-medium text-stone-800 hover:text-brand-700">
                {item.name}
              </p>
              {item.price !== null && (
                <p className="text-xs text-stone-500">From ₹{item.price.toFixed(2)}</p>
              )}
            </Link>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative aspect-9/16 w-full max-w-sm overflow-hidden rounded-xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="h-full w-full object-contain"
              src={items[openIndex].video}
              autoPlay
              loop
              controls
              playsInline
            />
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close video"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
