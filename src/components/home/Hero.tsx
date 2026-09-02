"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/gallery/sai-01.jpeg",
    eyebrow: "Custom printed, delivered fast",
    title: "Labels & stickers made your way",
    body: "Roll labels, die-cut stickers, holographic finishes, and more — order online in minutes.",
  },
  {
    image: "/images/gallery/sai-09.jpeg",
    eyebrow: "From our own print floor",
    title: "Premium finish, every roll",
    body: "High-gloss, matte, and foil finishes printed in-house for consistent quality at any volume.",
  },
  {
    image: "/images/gallery/sai-14.jpeg",
    eyebrow: "Built for every industry",
    title: "Food, beverage, cosmetics & more",
    body: "Compliant, durable labels for packaged goods of every kind — trusted by real brands.",
  },
  {
    image: "/images/gallery/sai-03.jpeg",
    eyebrow: "No order too small",
    title: "From 25 pieces to bulk runs",
    body: "Flexible quantity tiers so you only pay for what you need.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate h-[440px] overflow-hidden bg-brand-900 sm:h-[520px]">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/30" />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center gap-4 px-6">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100">
              {slide.eyebrow}
            </span>
            <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {slide.title}
            </h1>
            <p className="max-w-md text-base text-brand-100 sm:text-lg">
              {slide.body}
            </p>
            <a
              href="#featured"
              className="mt-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-accent-400"
            >
              Shop Labels
            </a>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
