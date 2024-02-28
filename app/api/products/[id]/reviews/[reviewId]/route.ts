import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { CustomError } from "@/utils/errors/CustomError";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface Slugs {
  params: {
    id: string;
    reviewId: string;
  };
}

export async function DELETE(req: Request, { params }: Slugs) {
  try {
    const id = parseInt(params.id);
    const reviewId = parseInt(params.reviewId);
    console.log(id, reviewId);

    if (!id || id === null)
      throw new CustomError("ProduktId darf nicht leer sein");

    if (!reviewId || reviewId === null)
      throw new CustomError("ReviewId darf nicht leer sein");

    const foundReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!foundReview) throw new CustomError("Bewertung wurde nicht gefunden");

    // AUTHENTICATION
    const user = await authenticateServer();
    if (!user || user.id !== foundReview.authorId)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );

    // DELETE REVIEW
    const deletedReview = await prisma.review.delete({
      where: { id: reviewId },
    });

    // UPDATE PRODUCT RATING & CNT
    const product = await prisma.productgroup.findUnique({
      where: { id: id },
      include: { reviews: true },
    });
    if (!product) throw new CustomError("Produkt wurde nicht gefunden");

    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const avgReview = totalReviews > 0 ? totalRating / totalReviews : 0;

    const updatedProduct = await prisma.productgroup.update({
      where: { id },
      data: {
        rating: avgReview,
      },
    });

    // Revalidate
    revalidatePath("/");
    revalidatePath("/products/" + updatedProduct?.id);

    return NextResponse.json(deletedReview);
  } catch (e) {
    let msg = "Fehler bei Serveranfrage";
    console.log(e);
    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
