// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = { logoUrl: string };

export default function Header({ logoUrl }: HeaderProps) {
  const isHome = usePathname() === "/";

  return (
    <header
      className={
        isHome
          ? "fixed inset-0 z-20 flex items-center justify-center"
          : "absolute top-0 left-0 z-20 w-full"
      }
    >
      <div
        className={
          isHome
            ? "flex flex-col items-center gap-8 text-center"
            : "flex items-center justify-between w-full px-6 py-4"
        }
      >
        {/* Logo */}
        <Image
          src={logoUrl}
          alt="120 Production"
          width={isHome ? 320 : 180}
          height={isHome ? 100 : 60}
          priority
          className="object-contain"
        />

        {/* Navigation */}
        <nav>
          <ul
            className={`list-none flex gap-x-12 ${
              isHome ? "mt-4 text-lg font-semibold" : "text-base font-medium"
            }`}
          >
            {[
              { href: "/projets", label: "PROJETS" },
              { href: "/nous", label: "NOUS" },
              { href: "/contact", label: "CONTACT" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:opacity-80">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-white">TEST</div>
      </div>
    </header>
  );
}
