"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Forbidden");
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name) return;

  await prisma.category.create({
    data: { name, slug: slugify(name), description: description || null },
  });

  revalidatePath("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") ? String(formData.get("id")) : null;
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const published = formData.get("published") === "on";
  const tierLabels = formData.getAll("tierLabel").map(String);
  const tierPrices = formData.getAll("tierPrice").map(Number);
  const tierQuantities = formData.getAll("tierQuantity").map(Number);

  if (!name || !categoryId) return;

  const variants = tierLabels
    .map((label, i) => ({
      label,
      price: tierPrices[i],
      quantity: tierQuantities[i],
    }))
    .filter((v) => v.label && !Number.isNaN(v.price) && !Number.isNaN(v.quantity));

  const basePrice = variants.length
    ? Math.min(...variants.map((v) => v.price))
    : 0;

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description || null,
        categoryId,
        published,
        basePrice,
      },
    });
    // Simplest correct approach for an admin MVP: replace all variants on
    // every save rather than diffing existing rows.
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.productVariant.createMany({
      data: variants.map((v) => ({ ...v, productId: id })),
    });
    await saveProductImage(id, imageUrl);
  } else {
    const slugBase = slugify(name);
    let slug = slugBase;
    let suffix = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${++suffix}`;
    }

    const created = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null,
        categoryId,
        published,
        basePrice,
        variants: { create: variants },
      },
    });
    await saveProductImage(created.id, imageUrl);
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

async function saveProductImage(productId: string, imageUrl: string) {
  const primaryImageId = `${productId}-primary`;

  if (!imageUrl) {
    await prisma.productImage.deleteMany({ where: { id: primaryImageId } });
    return;
  }

  await prisma.productImage.upsert({
    where: { id: primaryImageId },
    update: { url: imageUrl },
    create: { id: primaryImageId, productId, url: imageUrl, sortOrder: 0 },
  });
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}
