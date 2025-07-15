"use client"; // Cần thiết khi sử dụng Link trong App Router
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>

      <div className="mt-6">
        <Link href="/" className="text-blue-500 underline hover:text-blue-700">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
