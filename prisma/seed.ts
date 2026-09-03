import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import seedData from "./seed-data.json";

const prisma = new PrismaClient();

async function main() {
  const categoryIdBySlug: Record<string, string> = {};

  for (const category of seedData.categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, image: category.image },
      create: category,
    });
    categoryIdBySlug[category.slug] = created.id;
  }

  for (const product of seedData.products) {
    const basePrice = Math.min(...product.tiers.map((t) => t.price));

    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        categoryId: categoryIdBySlug[product.categorySlug],
        basePrice,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        basePrice,
        categoryId: categoryIdBySlug[product.categorySlug],
        variants: {
          create: product.tiers.map((tier) => ({
            label: tier.label,
            quantity: tier.qty,
            price: tier.price,
          })),
        },
      },
    });

    // Keep variants in sync with the source data on re-seed.
    await prisma.productVariant.deleteMany({ where: { productId: created.id } });
    await prisma.productVariant.createMany({
      data: product.tiers.map((tier) => ({
        productId: created.id,
        label: tier.label,
        quantity: tier.qty,
        price: tier.price,
      })),
    });

    // Replace this product's images wholesale rather than upserting by id —
    // avoids accumulating orphaned rows if the image list ever changes.
    await prisma.productImage.deleteMany({ where: { productId: created.id } });
    await prisma.productImage.createMany({
      data: product.images.map((url, i) => ({
        productId: created.id,
        url,
        altText: product.name,
        sortOrder: i,
      })),
    });
  }

  // Remove products/categories from a previous taxonomy that are no longer
  // part of the source data — upsert only ever adds or updates, so a
  // renamed/replaced catalog otherwise leaves the old rows behind.
  const currentProductSlugs = seedData.products.map((p) => p.slug);
  const currentCategorySlugs = seedData.categories.map((c) => c.slug);

  await prisma.product.deleteMany({
    where: { slug: { notIn: currentProductSlugs } },
  });
  await prisma.category.deleteMany({
    where: { slug: { notIn: currentCategorySlugs } },
  });

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
