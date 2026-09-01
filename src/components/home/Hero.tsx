/**
 * Hero banner slot. Printongo uses a multi-slide video/image carousel here;
 * this starts as a single placeholder panel with a spot for a background
 * video (see the commented <video> tag) and swaps to a real carousel once
 * brand assets/video are supplied.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-800">
      {/* <video
        autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src="/videos/hero.mp4"
      /> */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-20 sm:py-28">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100">
          Custom printed, delivered fast
        </span>
        <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Labels &amp; stickers made your way
        </h1>
        <p className="max-w-md text-base text-brand-100 sm:text-lg">
          Roll labels, die-cut stickers, holographic finishes, and more —
          order online in minutes.
        </p>
        <a
          href="#featured"
          className="mt-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-accent-400"
        >
          Shop Labels
        </a>
      </div>
    </section>
  );
}
