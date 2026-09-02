import { siteConfig } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.315.63 4.482 1.727 6.342L3 29l7.35-2.178A12.44 12.44 0 0016 28c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm7.293 17.837c-.31.873-1.53 1.6-2.51 1.81-.668.142-1.54.256-4.474-.96-3.752-1.554-6.166-5.363-6.354-5.612-.18-.25-1.518-2.02-1.518-3.853s.955-2.734 1.294-3.108c.34-.375.74-.469.987-.469.247 0 .494.003.71.014.228.011.534-.086.834.637.31.746 1.052 2.579 1.144 2.766.093.187.155.406.031.656-.124.25-.186.406-.371.624-.187.218-.393.487-.562.655-.186.187-.38.39-.163.766.217.375.964 1.591 2.07 2.577 1.423 1.27 2.622 1.664 2.997 1.851.375.187.593.156.812-.094.218-.25.933-1.09 1.183-1.464.25-.375.5-.312.842-.187.343.124 2.176 1.026 2.549 1.213.373.187.622.28.712.437.093.156.093.905-.216 1.777z" />
      </svg>
    </a>
  );
}
