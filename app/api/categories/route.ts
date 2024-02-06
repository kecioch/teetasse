import prisma from "@/lib/prisma";
import { getCategories } from "@/lib/services/category";
import { CustomError } from "@/utils/errors/CustomError";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const categories = await getCategories();
  if (!categories)
    return NextResponse.json(
      { status: 500, msg: "Fehler bei Serveranfrage" },
      { status: 500 }
    );
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { title } = data;
    if (!title || title === null || title.length === 0)
      throw new CustomError("Titel darf nicht leer sein");

    const category = { title };
    const newCategory = await prisma.category.create({ data: category });
    revalidatePath("/", "layout");

    return NextResponse.json(newCategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2002") msg = "Kategorie exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
