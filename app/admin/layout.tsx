"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    // Skip auth check for login page
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.authenticated) {
        setUsername(data.username);
        setIsAuthenticated(true);
      } else {
        router.replace("/admin/login");
        return;
      }
    } catch {
      router.replace("/admin/login");
      return;
    }

    setIsLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.replace("/admin/login");
  }

  // Login page — render without sidebar
  if (isLoginPage) {
    return (
      <html lang="en">
        <body className="bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
          {children}
        </body>
      </html>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <html lang="en">
        <body className="bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-text-muted font-semibold">Loading Admin Panel…</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Authenticated admin layout
  if (!isAuthenticated) return null;

  return (
    <html lang="en">
      <body className="bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
        <AdminSidebar username={username} onLogout={handleLogout} />
        <div className="ml-64 min-h-screen">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
