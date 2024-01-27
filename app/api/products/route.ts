import prisma from "@/lib/prisma";
import { getProducts } from "@/lib/services/product";
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

    //   if (!title || title === null || title.length === 0)
    //     throw new CustomError("Titel darf nicht leer sein");

    // Create productgroup
    const product = {
      title,
      description,
      subcategoryId,
      recommended,
      imageUrls,
      features,
    };
    const newProduct = await prisma.productgroup.create({ data: product });

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

    return NextResponse.json(product);
  } catch (e: any) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    } else if (e.code === "P2002") msg = "Produkt exisitert bereits";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
