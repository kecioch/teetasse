import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IdSlug) {
  try {
    const { email, firstName, lastName } = await req.json();
    const user = await authenticateServer();
    console.log("PUT SESSION", user);

    // VALIDATION
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("UserId darf nicht leer sein");
    if (!user || (user.id !== id && user.role !== Role.ADMIN))
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );
    if (!email) throw new CustomError("Email nicht vorhanden");
    if (!firstName) throw new CustomError("Vorname nicht vorhanden");
    if (!lastName) throw new CustomError("Nachname nicht vorhanden");
    const foundUser = await prisma.user.findFirst({
      where: { email: { mode: "insensitive", equals: email } },
    });
    if (foundUser && foundUser.id !== id)
      return NextResponse.json(
        {
          status: 500,
          msg: "Email ist bereits vergeben",
          code: "EMAIL_TAKEN",
        },
        { status: 500 }
      );

    // UPDATE USER
    const updatetUser = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email },
    });

    return NextResponse.json({
      status: 200,
      msg: "Nutzer erfolgreich aktualisiert",
    });
  } catch (e) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: IdSlug) {
  try {
    const user = await authenticateServer([Role.ADMIN]);
    console.log("DELETE SESSION", user);

    // VALIDATION
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("UserId darf nicht leer sein");

    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    // FIND USER
    const foundUser = await prisma.user.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!foundUser) throw new CustomError("Nutzer nicht gefunden");

    // CHECK REVIEWS AND UPDATE RATINGS
    if (foundUser.reviews.length > 0) {
      foundUser.reviews.forEach(async (review) => {
        const productgroup = await prisma.productgroup.findUnique({
          where: {
            id: review.productgroupId,
          },
          include: { reviews: true },
        });
        if (!productgroup) throw new CustomError("Produkt nicht gefunden");

        // CALCULATE NEW AVG RATING
        const reviews = productgroup.reviews.filter((el) => el.authorId !== id);
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const avgReview = totalReviews > 0 ? totalRating / totalReviews : 0;

        // UPDATE PRODUCTGROUP
        await prisma.productgroup.update({
          where: { id: review.productgroupId },
          data: {
            rating: avgReview,
          },
        });

        // REVALIDATE
        revalidatePath("/");
        revalidatePath("/products/" + review.productgroupId);
      });
    }

    // DELETE USER
    const deletedUser = await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { status: 200, msg: "Nutzer wurde erfolgreich gelöscht" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
