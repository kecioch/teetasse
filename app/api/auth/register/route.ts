import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { CustomError } from "@/utils/errors/CustomError";
import { Role } from "@prisma/client";
import { authenticateServer } from "@/services/auth/authentication";

export async function POST(req: Request) {
  try {
    console.log("REGISTER POST");
    const { email, password, firstName, lastName, role } = await req.json();
    console.log(email, password, firstName, lastName, role);

    // VALIDATION
    if (!email) throw new CustomError("Email nicht vorhanden");
    if (!password) throw new CustomError("Passwort nicht vorhanden");
    if (password && password.length < 8)
      throw new CustomError("Passwort muss mindestens 8 Zeichen beinhalten");
    if (!firstName) throw new CustomError("Vorname nicht vorhanden");
    if (!lastName) throw new CustomError("Nachname nicht vorhanden");

    const foundUser = await prisma.user.findFirst({
      where: { email: { mode: "insensitive", equals: email } },
    });
    if (foundUser)
      return NextResponse.json(
        {
          status: 500,
          msg: "Email ist bereits vergeben",
          code: "EMAIL_TAKEN",
        },
        { status: 500 }
      );

    // CHECK ADMIN TO CHANGE ROLE
    let userRole = Role.CUSTOMER;
    if (role) {
      const user = await authenticateServer([Role.ADMIN]);
      if (user) userRole = role;
      else
        return NextResponse.json(
          { status: 401, msg: "Nutzer ist nicht berechtigt" },
          { status: 401 }
        );
    }

    // CREATE USER
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: userRole,
      },
    });

    return NextResponse.json({
      status: 200,
      msg: "Nutzer erfolgreich angelegt",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    let msg = "Fehler bei Serveranfrage";

    if (e instanceof CustomError) msg = e.message;

    return NextResponse.json({ status: 500, msg }, { status: 500 });
  }
}
