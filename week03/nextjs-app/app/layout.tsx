"use client";

import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/lesson11", label: "Lesson 11" },
    { href: "/lesson12", label: "Lesson 12" },
    { href: "/lesson13", label: "Lesson 13" },
    { href: "/lesson14/login", label: "Lesson 14" },
  ];

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow p-4">
          <ul className="flex gap-4 justify-center p-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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

        <main className="p-20">{children}</main>
      </body>
    </html>
  );
}
