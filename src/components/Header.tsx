// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

type HeaderProps = { logoUrl: string };

export default function Header({ logoUrl }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const classNames = [
    "w-full",
    "flex",
    "flex-col",
    "items-center",
    "justify-between",
    "fixed",
    "z-1",
    "h-[130px]",
    "top-0",
    'py-[20px]',
    isHome ? "top-[calc(50%-65px)]" : "",
    "transition-top",
    "duration-200",
    "z-100",
  ].filter(Boolean);

  return (
    <header className={classNames.join(" ")}>
      <Link href={"/"}>
        <Image
          src={logoUrl}
          alt="120 Production"
          width={240}
          height={0}
          priority
          className="h-auto"
        />
      </Link>

      <Menu size={48} color="white" className="sm:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav className="hidden sm:flex sm:gap-4">
        {[
          { href: "/projets", label: "PROJETS" },
          { href: "/nos-references", label: "NOUS" },
          { href: "/contact", label: "CONTACT" },
          { href: "/backstage", label: "BACKSTAGE" },
          { href: "/shop", label: "SHOP" },
        ].map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          const classNames = [
            "relative",
            "block",
            "after:block",
            "after:absolute",
            "after:content-['']",
            "after:h-[2px]",
            "after:bg-white",
            "after:transform-[translateX(-50%)]",
            "after:left-1/2",
            "after:transition-width",
            "after:duration-200",
            "after:w-0",
            isActive ? "after:w-full" : "",
            "text-sm",
          ].filter(Boolean).join(" ");
          return (
            <div key={href}>
              <Link href={href} className={classNames}>
                {label}
              </Link>
            </div>
          );
        })}
      </nav>


    </header>
  );
}
