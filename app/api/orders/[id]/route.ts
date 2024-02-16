import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: IdSlug) {
  try {
    // AUTHENTICATION
    const user = await authenticateServer([Role.STAFF, Role.ADMIN]);
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    const id = parseInt(params.id);
    if (!id || id === null) throw new CustomError("Keine BestellungsId");

    const data = await req.json();
    const { orderState, deliveryState } = data;
    console.log({ id, orderState, deliveryState });

    // UPDATE
    const updatetOrder = await prisma.order.update({
      where: { id },
      data: {
        deliveryState,
        orderState,
      },
    });

    return NextResponse.json({ updatet: true });
  } catch (e: any) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
