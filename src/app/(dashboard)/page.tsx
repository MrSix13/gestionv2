import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import Image from "next/image";
import { GlobalStoreProvider } from "@/context";
import { UserButton } from "@/components/user-button";
import { NavBar } from "@/components/NavBar";

export interface User {
  name: string;
  email: string;
}

export interface Store {
  USUARIO: User;
  FUNCIONALIDADES: any[];
}

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("COOKIE_GESTION")?.value;

  let store: Store | null = null;

  if (token) {
    try {
      const decoded = verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET || ""
      ) as Store;
      store = decoded;
    } catch (error) {
      console.error("Token decoding error:", error);
      redirect("/sign-in");
    }
  }

  if (!store) {
    redirect("/sign-in");
  }

  // Renderiza solo si el usuario está autenticado
  return (
    // <GlobalStoreProvider store={{ user }}>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Links del footer */}
      </footer>
    </div>
    // </GlobalStoreProvider>
  );
}
