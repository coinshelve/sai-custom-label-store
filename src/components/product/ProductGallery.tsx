"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  productName,
}: {
  images: { url: string; altText: string | null }[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100">
        {current && (
          <Image
            src={current.url}
            alt={current.altText ?? productName}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, i) => (
            <button
              key={image.url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 ${
                i === active ? "border-brand-600" : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
