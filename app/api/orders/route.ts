import { getOrders } from "@/lib/services/orders";
import { authenticateServer } from "@/services/auth/authentication";
import { OrderFilterOptions, SortBy } from "@/types/filterOptions";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userIdParam = req.nextUrl.searchParams.get("userId");
    const sortBy = req.nextUrl.searchParams.get("sortBy");
    const page = req.nextUrl.searchParams.get("page");
    const pageSize = req.nextUrl.searchParams.get("pageSize");
    const search = req.nextUrl.searchParams.get("search");

    // AUTHENTICATION
    const user = await authenticateServer();
    const userStaff = await authenticateServer([Role.STAFF, Role.ADMIN]);
    const userId = userIdParam && parseInt(userIdParam);
    if (userId) {
      if (!(user && user.id === userId))
        return NextResponse.json(
          { status: 401, msg: "Nutzer ist nicht berechtigt" },
          { status: 401 }
        );
    } else if (!userStaff) {
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );
    }

    const options: OrderFilterOptions = {
      sortBy: sortBy ? (parseInt(sortBy) as SortBy) : undefined,
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined,
      search: search || undefined,
    };

    const orderData = await getOrders(userId || undefined, options);
    if (!orderData)
      return NextResponse.json(
        { status: 500, msg: "Fehler bei Serveranfrage" },
        { status: 500 }
      );
    return NextResponse.json(orderData);
  } catch (e) {
    let msg = "Fehler bei Serveranfrage";
    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
