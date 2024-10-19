import { MobileSidebar } from "./mobile-sidebar";
import { UserButton } from "./user-button";

export const NavBar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">Monitorea tus Proyectos</p>
      </div>
      <MobileSidebar />

      <UserButton />
    </nav>
  );
};
