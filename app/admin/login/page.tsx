"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      router.replace("/admin");
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-extrabold text-lg">K</div>
            <span className="font-heading font-extrabold text-2xl text-white">Khushi Finance</span>
          </div>
          <p className="text-sm text-[#94A3B8] font-semibold">Admin Dashboard Login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-text-dark font-heading mb-1">Welcome Back</h2>
          <p className="text-sm text-text-muted mb-6">Enter your credentials to access the Lead Management System.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="adminUsername" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Username</label>
              <input
                type="text"
                id="adminUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="adminPassword" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                id="adminPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#64748B] mt-6">
          © 2026 Khushi Finance. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
