import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGallery } from "@/components/product/ProductGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: productSlug, published: true },
    include: {
      category: true,
      variants: { orderBy: { quantity: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <nav className="mb-6 text-xs text-stone-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/labels/${product.category.slug}`}
          className="hover:text-brand-700"
        >
          {product.category.name}
        </Link>{" "}
        / <span className="text-stone-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 sm:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <p className="text-sm text-brand-700">{product.category.name}</p>
          <h1 className="mt-1 text-2xl font-bold text-stone-900">
            {product.name}
          </h1>
          {product.description && (
            <p className="mt-3 text-sm text-stone-600">
              {product.description}
            </p>
          )}

          <ProductPurchasePanel
            productSlug={product.slug}
            productName={product.name}
            variants={product.variants.map((v) => ({
              id: v.id,
              label: v.label,
              price: v.price,
            }))}
          />

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-200 pt-6 text-xs text-stone-500">
            <div>
              <dt className="font-medium text-stone-700">Turnaround</dt>
              <dd className="mt-1">2–4 business days</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-700">Shipping</dt>
              <dd className="mt-1">Pan-India delivery</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-700">Proof</dt>
              <dd className="mt-1">Digital proof before print</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-700">Support</dt>
              <dd className="mt-1">WhatsApp & email</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
