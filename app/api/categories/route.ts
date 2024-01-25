import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const categories = await prisma.category.findMany();
  return Response.json(categories);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const { title } = data;
    const category = { title };

    const newCategory = await prisma.category.create({ data: category });
    console.log(newCategory);
    
    return Response.json(newCategory);
  } catch (err) {
    // console.log(err);
    return new Response("ERROR");
  }
}
