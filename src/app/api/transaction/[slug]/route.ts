import { NextResponse } from "next/server";
import data from "../data.json";
import { z } from "zod";
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const slug = z.string().parse(params.slug);

  const transaction = data.transaction.find((transaction) => transaction.slug === slug);

  if (!transaction) {
    return Response.json({ message: "Ops" }, { status: 400 });
  }

  return Response.json(transaction);
}
