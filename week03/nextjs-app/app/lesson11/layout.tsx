"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Lesson11Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/lesson11", label: "Lesson Home" },
    { href: "/lesson11/blog", label: "Blog" },
    { href: "/lesson11/contact", label: "Contact" },
    { href: "/lesson11/products", label: "Products" },
    { href: "/lesson11/login", label: "Login" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="sticky top-[80px] z-40 bg-white shadow p-3">
        <ul className="flex gap-4 justify-center p-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
