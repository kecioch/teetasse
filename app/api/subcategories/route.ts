import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(subcategories);
  } catch (e) {
    return NextResponse.json(
      { status: 500, msg: "Fehler bei der Serveranfrage" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // AUTHENTICATION
    const user = await authenticateServer([Role.STAFF, Role.ADMIN]);
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    const data = await req.json();
    const { title, categoryId } = data;
    console.log(categoryId);
    if (!title || title === null || title.length === 0)
      throw new CustomError("Titel darf nicht leer sein");
    if (!categoryId || categoryId === null)
      throw new CustomError("KategorieId darf nicht leer sein");

    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) throw new CustomError("Kategorie nicht gefunden");

    const subcategory = { title, categoryId: category.id };

    const newSubcategory = await prisma.subcategory.create({
      data: subcategory,
    });

    revalidatePath("/", "layout");
    return NextResponse.json(newSubcategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2002") msg = "Subkategorie exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
