import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navigation } from "./Navigation";
import { DottedSeparator } from "./ui/dotted-separator";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"}>
        <Image
          src="/logo_manager_digital.png"
          alt="logo"
          width={164}
          height={48}
        />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
