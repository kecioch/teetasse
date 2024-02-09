import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

export const authenticateServer = async (roles?: Role[]) => {
  const session = await getServerSession(authOptions);
  if (!session) return false;

  if (!roles) return session.user;

  if (roles.includes(session.user.role)) return session.user;
  else return false;
};
