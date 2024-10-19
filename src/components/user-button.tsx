"use client";

import { useStore } from "@/context";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DottedSeparator } from "./ui/dotted-separator";
import { useLogout } from "@/features/auth/api/use-logout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const { store } = useStore();
  const router = useRouter();
  const { mutate: logout } = useLogout();
  console.log("STORE:", store);
  const { correo, nombre } = store["USUARIO"];

  const avatarFallback = nombre
    ? nombre.charAt(0).toUpperCase()
    : correo.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60 "
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] hover:opacity-75 transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {nombre || "User"}
            </p>
            <p className="text-xs text-neutral-500">{correo}</p>
          </div>
        </div>
        <DottedSeparator className="mb-3" />
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
          className=" h-10 flex items-center justify-center text-amber-700 font-medium"
        >
          <LogOut className="size-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
