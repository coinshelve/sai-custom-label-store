import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = signupSchema.parse(await request.json());

  const existing = await prisma.customer.findUnique({ where: { email: body.email } });
  const passwordHash = await bcrypt.hash(body.password, 10);

  if (existing) {
    // Guest checkout creates a customer row without a usable login. Let that
    // same email "claim" the account by setting a real password, but block
    // re-signup for an account that already has one.
    if (existing.passwordHash !== "guest-checkout") {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }
    await prisma.customer.update({
      where: { id: existing.id },
      data: { name: body.name, passwordHash },
    });
  } else {
    await prisma.customer.create({
      data: { name: body.name, email: body.email, passwordHash },
    });
  }

  return NextResponse.json({ success: true });
}
