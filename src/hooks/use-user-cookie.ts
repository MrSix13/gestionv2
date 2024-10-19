import { User } from "@/app/(dashboard)/page";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const useCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("COOKIE_GESTION")?.value;

  let store: User | null = null;

  if (token) {
    try {
      const decoded = verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET || ""
      ) as User;
      store = decoded;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  return { store };
};
