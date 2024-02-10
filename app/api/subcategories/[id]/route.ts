import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IdSlug) {
  try {
    // AUTHENTICATION
    const user = await authenticateServer([Role.STAFF, Role.ADMIN]);
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    const data = await req.json();
    const { title } = data;
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("SubkategorieId darf nicht leer sein");
    if (!title || title === null || title.length === 0)
      throw new CustomError("Titel darf nicht leer sein");

    const subcategory = { title };

    const updatetSubcategory = await prisma.subcategory.update({
      where: { id },
      data: subcategory,
    });

    revalidatePath("/", "layout");
    return NextResponse.json(updatetSubcategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2025") {
      msg = "Subkategorie nicht gefunden";
    } else if (e.code === "P2002") msg = "Subkategorie exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: IdSlug) {
  try {
    // AUTHENTICATION
    const user = await authenticateServer([Role.STAFF, Role.ADMIN]);
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("SubkategorieId darf nicht leer sein");

    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: { productgroups: true },
    });
    if (!subcategory) throw new CustomError("Subkategorie nicht gefunden");

    if (subcategory.productgroups.length > 0)
      throw new CustomError("Subkategorie referenziert noch Produkte");

    const deletedSubcategory = await prisma.subcategory.delete({
      where: { id },
    });

    revalidatePath("/", "layout");
    return NextResponse.json(deletedSubcategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
