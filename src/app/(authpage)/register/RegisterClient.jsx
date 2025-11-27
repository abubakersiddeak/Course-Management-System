"use client";

import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonLoader from "@/components/ui/ButtonLoader";
import { useSearchParams, useRouter } from "next/navigation";

const getFirebaseErrorMessage = (error) => {
  const code = error?.code || "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please log in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Your password is too weak. Try using a longer password with numbers and symbols.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
};

export function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { SiginupUser, signupWithGoogle, ubdateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = form;

    if (!name || !email || !password || !confirm) {
      Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Please fill in all fields.",
      });
      return;
    }

    // Confirm password
    if (password !== confirm) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
      });
      return;
    }

    // Password length > 6 characters
    if (password.length <= 6) {
      Swal.fire({
        icon: "error",
        title: "Weak password",
        text: "Password must be more than 6 characters.",
      });
      return;
    }

    if (!form.agree) {
      Swal.fire({
        icon: "warning",
        title: "Accept terms",
        text: "You must agree to the Terms & Conditions to create an account.",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await SiginupUser(email, password);
      const user = userCredential.user;

      // update user profile via your hook
      await ubdateUser(user, {
        displayName: name || "Anonymous",
        photoURL:
          "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
      });

      Swal.fire({
        title: "Success!",
        text: "Your account has been created.",
        icon: "success",
      }).then(() => {
        router.push(redirectTo);
      });
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: getFirebaseErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-indigo-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join us and get started in just a few steps.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
          {/* Subtle linear glow */}
          <div className="pointer-events-none absolute inset-x-8 -top-12 h-20 bg-linear-to-b from-sky-200/70 to-transparent opacity-80 blur-2xl" />

          <form onSubmit={handleSubmit} className="relative space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

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
                value={form.email}
                onChange={handleChange}
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
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
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
              <p className="mt-1 text-[11px] text-slate-500">
                Must be more than 6 characters. Use numbers & symbols for extra
                security.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  placeholder="Repeat your password"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 border border-slate-200">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <label htmlFor="agree" className="text-xs text-slate-700">
                I agree to the{" "}
                <button
                  type="button"
                  className="cursor-pointer font-medium text-sky-600 underline-offset-2 hover:underline"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="cursor-pointer font-medium text-sky-600 underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={!form.agree || loading}
                className={
                  "cursor-pointer inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 " +
                  (!form.agree || loading
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-sky-600 hover:bg-sky-700")
                }
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google button */}
          <div className="space-y-3">
            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const result = await signupWithGoogle();
                    const user = result.user;
                    console.log("Google signup:", user);
                    Swal.fire({
                      icon: "success",
                      title: "Signed in with Google",
                      text: "Your account is ready.",
                    }).then(() => {
                      router.push(redirectTo);
                    });
                  } catch (error) {
                    console.error("Google signup error:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Google sign‑in failed",
                      text: getFirebaseErrorMessage(error),
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
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
            )}

            {/* Footer */}
            <p className="pt-1 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-sky-600 underline-offset-2 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
