import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function UseCaseGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl font-bold text-stone-900">Shop by Industry</h2>
      <p className="mt-1 text-sm text-stone-500">
        Labels and packaging picked for what you sell.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {siteConfig.useCases.map((useCase) => (
          <Link
            key={useCase.slug}
            href={`/use-case/${useCase.slug}`}
            className="group rounded-lg border border-stone-200 p-4 text-center transition hover:border-brand-400 hover:shadow-sm"
          >
            <p className="text-sm font-medium text-stone-800 group-hover:text-brand-700">
              {useCase.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
