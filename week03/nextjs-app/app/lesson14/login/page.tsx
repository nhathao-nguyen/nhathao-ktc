"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as loginApi } from "../services/index";
import { useAuthGuard } from "../hook/useAuthGuard";
import { useAuthStore } from "../stores/useAuthStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    error,
    clearError,
    setError,
    login: setAuthUser,
    isAuthenticated,
    forceClearAuth,
  } = useAuthStore();

  // Use auth guard to redirect if already logged in
  const { hydrated, isLoading } = useAuthGuard({
    requireAuth: false, // Don't require auth for login page
  });

  // Nếu đã đăng nhập thì chuyển hướng sang dashboard
  useEffect(() => {
    if (isAuthenticated && typeof window !== "undefined") {
      router.push("/lesson14/dashboard");
    }
  }, [isAuthenticated, router]);

  // On mount, if token is invalid, force clear auth
  useEffect(() => {
    clearError();
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (!token || token === "undefined" || token === "") {
        forceClearAuth();
      }
    }
  }, [clearError, forceClearAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      const response = await loginApi(username, password);
      // The response should contain user and token
      // Adjust this if your API returns a different structure
      const { loggedInUser, access_token } = response;
      // Never log or display access_token in UI or console for security
      if (!loggedInUser) {
        throw new Error("API did not return loggedInUser");
      }
      // Map roles array to role property (handle array of objects or strings)
      let role;
      if (Array.isArray(loggedInUser.roles) && loggedInUser.roles.length > 0) {
        if (typeof loggedInUser.roles[0] === "string") {
          // roles is array of strings
          const adminLike = loggedInUser.roles.find(
            (r: string) =>
              r.toLowerCase() === "admin" ||
              r.toLowerCase() === "administrators"
          );
          role = adminLike ? "admin" : loggedInUser.roles[0];
        } else if (
          typeof loggedInUser.roles[0] === "object" &&
          loggedInUser.roles[0].name
        ) {
          // roles is array of objects
          const adminRole = loggedInUser.roles.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (r: any) =>
              r.name &&
              (r.name.toLowerCase() === "admin" ||
                r.name.toLowerCase() === "administrators")
          );
          role = adminRole ? "admin" : loggedInUser.roles[0].name;
        }
      }
      if (!role || typeof role !== "string") {
        throw new Error(
          "User object missing roles. Please check API response."
        );
      }
      const userForStore = { ...loggedInUser, role };
      if (userForStore && access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(userForStore));
        setAuthUser(userForStore, access_token);
      } else {
        throw new Error("Invalid login response");
      }
      // Auth guard will handle redirect to dashboard
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please check your credentials.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth status
  if (!hydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render login form if already authenticated (auth guard will redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-2">
          <div className="bg-indigo-100 rounded-full p-3 shadow">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 8v-2a4 4 0 00-4-4H5a2 2 0 00-2 2v4h18v-4a2 2 0 00-2-2h-3a4 4 0 00-4 4z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Task Management System
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg shadow-sm space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400 text-gray-900 bg-gray-50"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400 text-gray-900 bg-gray-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200 mt-2 flex items-center gap-2 animate-fade-in">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
