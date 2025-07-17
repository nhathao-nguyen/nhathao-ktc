"use client";

import { useAuthGuard } from "../hook/useAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hydrated, isLoading } = useAuthGuard({ requireAuth: true });
  if (!hydrated || isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>;
  }
  return <>{children}</>;
}
