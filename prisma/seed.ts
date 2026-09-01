import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { name: "Roll Labels", slug: "roll-labels" },
  { name: "Die-Cut Stickers", slug: "die-cut-stickers" },
  { name: "Holographic Labels", slug: "holographic-labels" },
  { name: "Kraft Paper Labels", slug: "kraft-paper-labels" },
  { name: "Waterproof Labels", slug: "waterproof-labels" },
  { name: "Barcode Labels", slug: "barcode-labels" },
];

const productsByCategory: Record<
  string,
  { name: string; slug: string; tiers: { label: string; qty: number; price: number }[] }[]
> = {
  "roll-labels": [
    {
      name: "Glossy Roll Labels",
      slug: "glossy-roll-labels",
      tiers: [
        { label: "250", qty: 250, price: 349 },
        { label: "500", qty: 500, price: 599 },
        { label: "1000", qty: 1000, price: 999 },
      ],
    },
  ],
  "die-cut-stickers": [
    {
      name: "Custom Die-Cut Stickers",
      slug: "custom-die-cut-stickers",
      tiers: [
        { label: "50", qty: 50, price: 199 },
        { label: "100", qty: 100, price: 349 },
      ],
    },
  ],
  "holographic-labels": [
    {
      name: "Holographic Labels",
      slug: "holographic-labels-product",
      tiers: [
        { label: "25", qty: 25, price: 249 },
        { label: "50", qty: 50, price: 429 },
      ],
    },
  ],
  "kraft-paper-labels": [
    {
      name: "Kraft Paper Labels",
      slug: "kraft-paper-labels-product",
      tiers: [
        { label: "100", qty: 100, price: 299 },
        { label: "250", qty: 250, price: 649 },
      ],
    },
  ],
  "waterproof-labels": [
    {
      name: "Waterproof Vinyl Labels",
      slug: "waterproof-vinyl-labels",
      tiers: [
        { label: "100", qty: 100, price: 399 },
        { label: "250", qty: 250, price: 849 },
      ],
    },
  ],
  "barcode-labels": [
    {
      name: "Barcode Labels",
      slug: "barcode-labels-product",
      tiers: [
        { label: "500", qty: 500, price: 449 },
        { label: "1000", qty: 1000, price: 799 },
      ],
    },
  ],
};

async function main() {
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });

    for (const product of productsByCategory[category.slug] ?? []) {
      const basePrice = Math.min(...product.tiers.map((t) => t.price));

      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          name: product.name,
          slug: product.slug,
          basePrice,
          categoryId: createdCategory.id,
          variants: {
            create: product.tiers.map((tier) => ({
              label: tier.label,
              quantity: tier.qty,
              price: tier.price,
            })),
          },
        },
      });
    }
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await prisma.customer.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { passwordHash },
      create: { name: "Admin", email: process.env.ADMIN_EMAIL, passwordHash },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
