import { authenticateServer } from "@/services/auth/authentication";
import { User } from "@/types/user";
import { Role } from "@prisma/client";
import prisma from "../prisma";

export async function getStaffAccounts(): Promise<User[] | null> {
  try {
    const staffAccounts = await prisma.user.findMany({
      where: { role: Role.STAFF },
      orderBy: { id: "asc" },
    });

    const users: User[] = staffAccounts.map((el) => ({
      id: el.id,
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      role: el.role,
    }));
    return users;
  } catch (e) {
    console.log(e);
    return null;
  }
}
