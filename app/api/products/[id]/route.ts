import prisma from "@/lib/prisma";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IdSlug) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("ProduktId darf nicht leer sein");

    console.log("PUT PRODUCTS ", id);
    console.log(data);

    const {
      title,
      description,
      subcategoryId,
      recommended,
      imageUrls,
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

    const oldProductgroup = await prisma.productgroup.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!oldProductgroup) throw new CustomError("Produkt wurde nicht gefunden");

    // Create productgroup
    const productgroup = {
      title,
      description,
      subcategoryId,
      recommended,
      //   imageUrls: oldProduct.imageUrls,
      //   features: oldProduct.features,
      //   products: oldProduct.products
    };

    const updatetProductgroup = await prisma.productgroup.update({
      where: { id },
      data: productgroup,
      include: { subcategory: { include: { category: true } }, products: true },
    });

    // // Create products (variants)
    // for (let i = 0; i < variants.length; i++) {
    //   const { title, stock, price } = variants[i];
    //   const newProductVariant = await prisma.product.create({
    //     data: {
    //       title,
    //       stock,
    //       price,
    //       productgroupId: newProduct.id,
    //     },
    //   });
    // }

    // // Update ref values of newProduct
    // const newProduct: Product = {};
    // const updatetProduct = await prisma.productgroup.update({
    //   data: newProduct,
    //   where: { id: newProduct.id },
    //   include: {
    //     subcategory: { include: { category: true } },
    //     products: true,
    //   },
    // });

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
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("ProduktId darf nicht leer sein");

    const productgroup = await prisma.productgroup.findUnique({
      where: { id, visible: true },
      include: { products: { where: { visible: true } } },
    });
    if (!productgroup) throw new CustomError("Produkt nicht gefunden");

    // let visible = true;
    // for (let i = 0; i < productgroup.products.length; i++) {
    //     if(productgroup.products[i].)
    //     // ADD CHECK ORDERS
    // }

    const deletedProductgroup = await prisma.productgroup.delete({
      where: { id },
    });

    return NextResponse.json(deletedProductgroup);
  } catch (e: any) {
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
