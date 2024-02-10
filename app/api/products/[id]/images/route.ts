import { NextResponse } from "next/server";
import { upload } from "@/services/cloudinary/upload";
import { CustomError } from "@/utils/errors/CustomError";
import prisma from "@/lib/prisma";
import { IdSlug } from "@/types/slugs/Id";
import { authenticateServer } from "@/services/auth/authentication";
import { Role } from "@prisma/client";

export async function POST(req: Request, { params }: IdSlug) {
  try {
    // AUTHENTICATION
    const user = await authenticateServer([Role.STAFF, Role.ADMIN]);
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    const formData = await req.formData();
    const id = parseInt(params.id);

    if (!id) throw new CustomError("Keine ProduktId vorhanden");

    const oldProductgroup = await prisma.productgroup.findUnique({
      where: { id },
    });
    if (!oldProductgroup) throw new CustomError("Produkt nicht gefunden");

    const formDataEntries = formData.entries();
    const imageIds: string[] = oldProductgroup.imageIds || [];
    // Iterate through images
    for (
      let entry = formDataEntries.next();
      !entry.done;
      entry = formDataEntries.next()
    ) {
      const [name, file] = entry.value;
      // // Upload images to cloudinary
      const res: any = await upload(file as File);
      if (res.success) imageIds.push(res.result.public_id);
      else throw new CustomError("Fehler beim Hochladen des Bildes");
    }

    // Update product
    const productgroup = await prisma.productgroup.update({
      where: { id },
      data: { imageIds },
    });

    return NextResponse.json(productgroup);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
