import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "TRUE")
    return new NextResponse("Wartungsarbeiten");

  return NextResponse.next();
}
