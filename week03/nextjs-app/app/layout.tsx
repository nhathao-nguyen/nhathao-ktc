import Link from "next/link";

export const metadata = {
  title: "My Next.js App",
  description: "Practice Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <nav className="bg-white shadow p-4">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
