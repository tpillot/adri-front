"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const pathname = usePathname();

  const classNames = [
    "fixed",
    "w-screen",
    "h-screen",
    "bg-black",
    "top-0",
    "left-0",
    "z-1000",
    isOpen ? "translate-x-0" : "translate-x-full",
    "transition-transform",
    "duration-200",
    "ease-in-out",
    "flex",
    "items-center",
    "justify-center",
  ].filter(Boolean);

  return (
    <div className={classNames.join(" ")}>
      <nav className="flex flex-col items-center gap-4">
        {[
          { href: "/projets", label: "PROJETS" },
          { href: "/nos-references", label: "NOUS" },
          { href: "/contact", label: "CONTACT" },
          { href: "/backstage", label: "BACKSTAGE" },
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
              <Link href={href} className={classNames} onClick={() => setIsOpen(false)}>
                {label}
              </Link>
            </div>
          );
        })}
      </nav>      
    </div>
  );
}
