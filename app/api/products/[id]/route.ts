import prisma from "@/lib/prisma";
import { getProduct, hasDuplicateProductTitle } from "@/lib/services/product";
import { authenticateServer } from "@/services/auth/authentication";
import { deleteFile } from "@/services/cloudinary/delete";
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

    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("ProduktId darf nicht leer sein");

    console.log("PUT PRODUCT ", id);
    console.log(data);

    const {
      title,
      description,
      subcategoryId,
      recommended,
      imageIds,
      variants,
      features,
    } = data;

    if (!title || title === null || title.length === 0)
      throw new CustomError("Titel darf nicht leer sein");
    if (!description || description === null || description.length === 0)
      throw new CustomError("Beschreibung darf nicht leer sein");

    if (!subcategoryId || description === null)
      throw new CustomError("SubKategorieId darf nicht leer sein");

    if (!variants || variants === null || variants.length === 0)
      throw new CustomError("Produkt benötigt mindestens eine Variante");

    if (hasDuplicateProductTitle(variants))
      throw new CustomError(
        "Die Namen von Produktvarianten müssen eindeutig sein"
      );

    const oldProductgroup = await prisma.productgroup.findUnique({
      where: { id },
      include: { products: { include: { orders: true } } },
    });
    if (!oldProductgroup) throw new CustomError("Produkt wurde nicht gefunden");

    // Check changes of imageIds
    for (let i = 0; i < oldProductgroup.imageIds.length; i++) {
      const imgId = oldProductgroup.imageIds[i];
      if (!imageIds.includes(imgId)) {
        console.log("DELETE IMG FROM CLOUD", imgId);
        // DELETE IMG FROM  CLOUDINARY CLOUDSTORAGE
        await deleteFile(imgId);
      }
    }

    // Check changes of products (variants)
    // Check first updatet / deletet variants
    for (let i = 0; i < oldProductgroup.products.length; i++) {
      const product = oldProductgroup.products[i];
      if (variants.findIndex((el: any) => el.id === product.id) === -1) {
        // VARIANT NOT FOUND
        if (product.orders.length > 0)
          // VARIANT VISIBLE TO FALSE
          await prisma.product.update({
            where: { id: product.id },
            data: { visible: false },
          });
        // VARIANT DELETE
        else await prisma.product.delete({ where: { id: product.id } });
      } else {
        // VARIANTE FOUND
        // VARIANTE UPDATE
        await prisma.product.update({
          where: { id: product.id },
          data: {
            title: variants[i].title,
            price: variants[i].price,
            stock: variants[i].stock,
          },
        });
      }
    }
    // Check new variants
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      variant.productgroupId = id;
      // Create new variant
      if (variant && !variant.id) {
        await prisma.product.create({ data: variant });
      }
    }

    // Create productgroup
    const productgroup = {
      title,
      description,
      subcategoryId,
      recommended,
      features,
      imageIds,
    };

    const updatetProductgroup = await prisma.productgroup.update({
      where: { id },
      data: productgroup,
      include: {
        subcategory: { include: { category: true } },
        products: { where: { visible: true } },
      },
    });

    // Revalidate
    revalidatePath("/");
    revalidatePath("/products/" + updatetProductgroup?.id);

    // Send newProduct
    return NextResponse.json(updatetProductgroup);
  } catch (e: any) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2002") msg = "Produkt exisitert bereits";

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
      throw new CustomError("ProduktId darf nicht leer sein");

    console.log("DELETE PRODUCT ", id);

    const productgroup = await prisma.productgroup.findUnique({
      where: { id, visible: true },
      include: {
        products: { where: { visible: true }, include: { orders: true } },
      },
    });
    if (!productgroup) throw new CustomError("Produkt nicht gefunden");

    // DELETE IMAGES FROM CLOUDINARY
    for (const imageId of productgroup.imageIds) {
      await deleteFile(imageId);
    }

    let visible = true;
    let deletedProductgroup;
    for (let i = 0; i < productgroup.products.length; i++) {
      const product = productgroup.products[i];
      if (product.orders.length > 0) {
        visible = false;
        await prisma.product.update({
          where: { id: product.id },
          data: { visible: false },
        });
      } else {
        await prisma.product.delete({ where: { id: product.id } });
      }
    }

    if (visible)
      deletedProductgroup = await prisma.productgroup.delete({
        where: { id },
      });
    else
      deletedProductgroup = await prisma.productgroup.update({
        where: { id },
        data: { visible: false, imageIds: [] },
      });

    // Revalidate
    revalidatePath("/");
    revalidatePath("/products/" + deletedProductgroup?.id);

    return NextResponse.json(deletedProductgroup);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: IdSlug) {
  try {
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("ProduktId darf nicht leer sein");

    const product = await getProduct(id);

    return NextResponse.json(product);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
