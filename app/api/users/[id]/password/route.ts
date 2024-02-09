import prisma from "@/lib/prisma";
import { authenticateServer } from "@/services/auth/authentication";
import { IdSlug } from "@/types/slugs/Id";
import { CustomError } from "@/utils/errors/CustomError";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IdSlug) {
  try {
    const { oldPassword, password } = await req.json();
    const user = await authenticateServer();

    console.log("PUT SESSION", user);

    // VALIDATION
    const id = parseInt(params.id);
    if (!id || id === null)
      throw new CustomError("UserId darf nicht leer sein");
    if (!user || user.id !== id)
      return NextResponse.json(
        { status: 401, msg: "Nutzer ist nicht berechtigt" },
        { status: 401 }
      );
    if (!oldPassword)
      throw new CustomError("Aktuelles Passwort nicht vorhanden");
    if (!password) throw new CustomError("Neues Passwort nicht vorhanden");
    if (password && password.length < 8)
      throw new CustomError("Passwort muss mindestens 8 Zeichen beinhalten");

    // FIND USER
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!foundUser) throw new CustomError("Nutzer nicht gefunden");

    // COMPARE PASSWORDS
    const passwordCorrect = await compare(
      oldPassword || "",
      foundUser.password
    );
    if (!passwordCorrect)
      return NextResponse.json(
        {
          status: 500,
          msg: "Aktuelles Passwort ist nicht korrekt",
          code: "OLDPASSWORD_INCORRECT",
        },
        { status: 500 }
      );

    // UPDATE USER
    const hashedPassword = await hash(password, 10);
    const updatetUser = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      status: 200,
      msg: "Passwort erfolgreich aktualisiert",
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
