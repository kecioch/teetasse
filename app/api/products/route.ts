import prisma from "@/lib/prisma";
import { getProducts, hasDuplicateProductTitle } from "@/lib/services/product";
import { upload } from "@/services/cloudinary/upload";
import { CustomError } from "@/utils/errors/CustomError";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const products = await getProducts();
  if (!products)
    return NextResponse.json(
      { status: 500, msg: "Fehler bei Serveranfrage" },
      { status: 500 }
    );
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("POST PRODUCT", data);

    const {
      title,
      description,
      subcategoryId,
      recommended,
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

    // Create productgroup
    const product = {
      title,
      description,
      subcategoryId,
      recommended,
      features,
    };

    const newProduct = await prisma.productgroup.create({
      data: product,
      include: { subcategory: { include: { category: true } }, products: true },
    });

    // Create products (variants)
    for (let i = 0; i < variants.length; i++) {
      const { title, stock, price } = variants[i];
      const newProductVariant = await prisma.product.create({
        data: {
          title,
          stock,
          price,
          productgroupId: newProduct.id,
        },
      });
    }

    // Update ref values of newProduct
    const updatetNewProduct = await prisma.productgroup.findUnique({
      where: { id: newProduct.id },
      include: {
        subcategory: { include: { category: true } },
        products: true,
      },
    });

    // Send newProduct
    return NextResponse.json(updatetNewProduct);
  } catch (e: any) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2002") msg = "Produkt exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
