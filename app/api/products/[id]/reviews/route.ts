import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { Review } from "@/types/review";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: IdSlug) {
  try {
    const data = await req.json();
    const { comment, rating } = data;

    const id = parseInt(params.id);
    if (!id) throw new CustomError("Keine ProduktId vorhanden");
    if (!rating) throw new CustomError("Keine Bewertung vorhanden");

    const user = await authenticateServer();
    if (!user)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht authorisiert" },
        { status: 401 }
      );

    // CHECK WHETHER USER ALREADY REVIEWED PRODUCT
    const foundReview = await prisma.review.findFirst({
      where: {
        productgroupId: id,
        authorId: user.id,
      },
    });
    if (foundReview)
      throw new CustomError("Nutzer hat bereits das Produkt bewertet");

    // CREATE REVIEW
    const review = await prisma.review.create({
      data: {
        authorId: user.id,
        productgroupId: id,
        rating,
        comment,
      },
      include: {
        author: true,
      },
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

    // RETURN CREATED REVIEW
    const createdReview: Review = {
      id: review.id,
      authorId: review.authorId,
      created: review.created,
      rating: review.rating,
      comment: review.comment,
      authorName: `${
        review.author.firstName
      } ${review.author.lastName.substring(0, 1)}.`,
    };

    return NextResponse.json(createdReview);
  } catch (e) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) {
      msg = e.message;
    }

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
