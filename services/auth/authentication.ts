import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const authenticateServer = async (roles?: Role[]) => {
  const session = await getServerSession(authOptions);
  if (!session) return false;

  if (!roles) return session.user;

  if (roles.includes(session.user.role)) return session.user;
  else return false;
};
