"use client";

import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { loginUser, signupWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Please enter both email and password.",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      console.log("Login success:", user);

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "You have logged in successfully.",
      }).then(() => {
        router.push(redirectTo);
      });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.message || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signupWithGoogle();
      const user = result.user;
      console.log("Google login:", user);

      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        text: "You have logged in successfully.",
      }).then(() => {
        router.push(redirectTo);
      });
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google sign‑in failed",
        text: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-indigo-50 px-4 py-5 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-sky-700 ring-1 ring-sky-200">
            Welcome back
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your details to access your dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
          {/* Subtle linear glow */}
          <div className="pointer-events-none absolute inset-x-8 -top-12 h-20 bg-linear-to-b from-sky-200/70 to-transparent opacity-80 blur-2xl" />

          <form onSubmit={handleFormSubmit} className="relative space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className={inputClass + " pr-12"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="mt-1 flex justify-end">
                <button
                  type="button"
                  className=" cursor-pointer text-[11px] font-medium text-sky-600 hover:text-sky-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className={
                  "cursor-pointer inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 " +
                  (loading
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-sky-600 hover:bg-sky-700")
                }
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <Image
              src="/Google.png"
              alt="Google"
              width={20}
              height={20}
              className="rounded-sm"
            />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="pt-4 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-sky-600 underline-offset-2 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
