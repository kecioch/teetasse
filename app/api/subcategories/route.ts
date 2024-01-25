import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const subcategories = await prisma.subcategory.findMany({
    include: {
      category: true,
    },
  });
  return Response.json(subcategories);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const { title } = data;

    const category = await prisma.category.findFirst({
      where: { title: "yaaa" },
    });
    if (!category) return new Response("ERROR CATEGORY NOT FOUND");

    const subcategory = { title, categoryId: category.id };

    const newSubcategory = await prisma.subcategory.create({
      data: subcategory,
    });
    console.log(newSubcategory);

    return Response.json(newSubcategory);
  } catch (err) {
    // console.log(err);
    return new Response("ERROR");
  }
}
