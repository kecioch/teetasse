import prisma from "@/lib/prisma";
import { getProducts, hasDuplicateProductTitle } from "@/lib/services/product";
import { authenticateServer } from "@/services/auth/authentication";
import { FilterOptions, SortBy } from "@/types/filterOptions";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categoryId = req.nextUrl.searchParams.get("categoryId");
    const subcategoryId = req.nextUrl.searchParams.get("subcategoryId");
    const sortBy = req.nextUrl.searchParams.get("sortBy");
    const page = req.nextUrl.searchParams.get("page");
    const pageSize = req.nextUrl.searchParams.get("pageSize");
    const search = req.nextUrl.searchParams.get("search");

    const options: FilterOptions = {
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      subcategoryId: subcategoryId ? parseInt(subcategoryId) : undefined,
      sortBy: sortBy ? (parseInt(sortBy) as SortBy) : undefined,
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined,
      search: search || undefined,
    };

    const products = await getProducts(options);
    if (!products)
      return NextResponse.json(
        { status: 500, msg: "Fehler bei Serveranfrage" },
        { status: 500 }
      );
    return NextResponse.json(products);
  } catch (e) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    return NextResponse.json({ status: 500, msg }, { status: 500 });
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
