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
  const isHome   = pathname === "/";

  /* ───── Header root ───── */
  const headerClasses = [
    "fixed w-full md:h-[130px] h-[150px] py-[20px] z-100 transition-top duration-200 justify-center",
    isHome
      ? "top-[calc(50%-65px)] flex flex-col items-center justify-between"
      : "top-0 flex items-center gap-4 md:gap-0",
  ].join(" ");

  /* ───── Nav (desktop ≥ sm) ───── */
  const navClasses = [
    "hidden md:flex gap-4",
    isHome ? "" : "ml-auto", // nav collée à droite hors Home
    !isHome ? "pr-12" : "",
  ].join(" ");

  /* ───── Burger (mobile) ───── */
  const burgerClasses = [
    "md:hidden cursor-pointer",
    "shrink-0",
  ].join(" ");

  return (
    <header className={headerClasses}>
      {/* Logo — décalé de 25 % hors Home */}
      <Link href="/" className={isHome ? "" : "flex md:ml-[15%]"}>
        <Image
          src={logoUrl}
          alt="120 Production"
          width={240}
          height={0}
          priority
          className="h-auto shrink-0"
        />
      </Link>

      {/* NAV DESKTOP */}
      <nav className={navClasses}>
        {[
          { href: "/projets",        label: "PROJETS" },
          { href: "/nos-references", label: "NOUS"    },
          { href: "/studio",         label: "STUDIO"  },
          { href: "/shop",           label: "SHOP"    },
          { href: "/contact",        label: "CONTACT" },

        ].map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          const linkClasses = [
            "relative block text-sm",
            "after:block after:absolute after:content-[''] after:h-[2px] after:bg-white",
            "after:left-1/2 after:-translate-x-1/2",
            "after:transition-all after:duration-200 after:w-0",
            isActive ? "after:w-full" : "",
          ].join(" ");
          return (
            <Link key={href} href={href} className={linkClasses}>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Burger mobile */}
      <Menu
        size={36}
        color="white"
        className={burgerClasses}
        onClick={() => setIsOpen(!isOpen)}
      />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
