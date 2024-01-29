import prisma from "@/lib/prisma";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IdSlug) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);
    const { title } = data;
    if (!id || id === null)
      throw new CustomError("KategorieId darf nicht leer sein");
    if (!title || title === null || title.length === 0)
      throw new CustomError("Titel darf nicht leer sein");

    const category = { title };

    const updatetCategory = await prisma.category.update({
      where: { id },
      data: category,
    });

    return NextResponse.json(updatetCategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2025") {
      msg = "Kategorie nicht gefunden";
    } else if (e.code === "P2002") msg = "Kategorie exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: IdSlug) {
  try {
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("KategorieId darf nicht leer sein");

    const category = await prisma.category.findUnique({
      where: { id },
      include: { subcategories: { include: { productgroups: true } } },
    });
    if (!category) throw new CustomError("Kategorie nicht gefunden");

    if (category.subcategories && category?.subcategories.length > 0)
      throw new CustomError("Kategorie enthält noch Subkategorien");

    // Check whether subcategories of category still have products associated
    for (let i = 0; i < category.subcategories.length; i++) {
      const subcategory = category.subcategories[i];
      if (subcategory.productgroups.length > 0)
        throw new CustomError(
          `Subkategorie(${subcategory.title}) referenziert noch Produkte`
        );
    }

    await prisma.subcategory.deleteMany({ where: { categoryId: id } });

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(deletedCategory);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
