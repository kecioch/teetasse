import { Role } from "@prisma/client";

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  email?: string;
  role: Role;
}
