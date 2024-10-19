import { NavBar } from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { GlobalStoreProvider } from "@/context";
import { cookies } from "next/headers";
import { User } from "./page";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { useCookie } from "@/hooks/use-user-cookie";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { store } = useCookie();

  if (!store) {
    redirect("/sign-in");
  }
  return (
    <div className="min-h-screen">
      <GlobalStoreProvider store={store}>
        <div className="flex w-full h-full">
          <div className="fixed left-0 top-0 hidden lg:block lg:w-[240px] h-full overflow-y-auto">
            <Sidebar />
          </div>
          <div className="lg:pl-[264px] w-full">
            <div className="mx-auto max-w-screen-2xl h-full">
              <NavBar />
              <main className="h-full py-8 flex flex-col">{children}</main>
            </div>
          </div>
        </div>
      </GlobalStoreProvider>
    </div>
  );
};

export default DashboardLayout;
