"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const links = [
  { href: "/", title: "Home" },
  { href: "/courses", title: "Courses" },
  { href: "/about", title: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, signout } = useAuth();

  const handleLogout = async () => {
    try {
      await signout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="navbar bg-base-100/90 backdrop-blur border-b border-slate-200 shadow-sm sticky top-0 z-50">
      {/* Left - Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h12M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-100 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={
                      isActive
                        ? "font-semibold text-sky-600"
                        : "text-slate-600 hover:text-sky-600"
                    }
                  >
                    {l.title}
                  </Link>
                </li>
              );
            })}
            {/* Dashboard link for mobile when logged in */}
            {currentUser && (
              <li>
                <Link
                  href="/dashboard"
                  className={
                    pathname === "/dashboard"
                      ? "font-semibold text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Brand */}

        <Link href="/" className="btn btn-ghost text-xl font-semibold gap-1">
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-sky-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
          </div>
          <span className="text-sky-600">LearnHub</span>
        </Link>
      </div>

      {/* Center - Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    "px-3 py-1 rounded-full text-sm transition " +
                    (isActive
                      ? "font-semibold text-sky-600 bg-sky-50 border border-sky-100"
                      : "text-slate-600 hover:text-sky-600 hover:bg-slate-50")
                  }
                >
                  {l.title}
                </Link>
              </li>
            );
          })}
          {/* Dashboard link for desktop when logged in */}
          {currentUser && (
            <li>
              <Link
                href="/dashboard"
                className={
                  "px-3 py-1 rounded-full text-sm transition " +
                  (pathname === "/dashboard"
                    ? "font-semibold text-sky-600 bg-sky-50 border border-sky-100"
                    : "text-slate-600 hover:text-sky-600 hover:bg-slate-50")
                }
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right - Auth / Profile */}
      <div className="navbar-end flex items-center gap-2">
        {/* Not logged in: show Login + Register icon buttons with tooltip */}
        {!currentUser && (
          <>
            <div className="tooltip tooltip-bottom" data-tip="Login">
              <Link href="/login" className="btn btn-ghost btn-circle">
                <LogIn className="h-5 w-5 text-slate-700" />
              </Link>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Register">
              <Link href="/register" className="btn btn-circle">
                <UserPlus className="h-5 w-5" />
              </Link>
            </div>
          </>
        )}

        {/* Logged in: show Dashboard icon (mobile) + Logout + User profile dropdown */}
        {currentUser && (
          <>
            {/* Dashboard icon button for mobile/tablet */}
            <div
              className="tooltip tooltip-bottom lg:hidden"
              data-tip="Dashboard"
            >
              <Link href="/dashboard" className="btn btn-ghost btn-circle">
                <LayoutDashboard className="h-5 w-5 text-slate-700" />
              </Link>
            </div>

            {/* User avatar & dropdown with name + email */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
                  {currentUser.photoURL ? (
                    <Image
                      src={currentUser.photoURL}
                      alt={
                        currentUser.displayName ||
                        currentUser.email ||
                        "currentUser"
                      }
                      width={36}
                      height={36}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-sky-700">
                      {currentUser.displayName?.[0] ||
                        currentUser.email?.[0]?.toUpperCase() ||
                        "U"}
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-100 p-3 shadow bg-base-100 rounded-box w-56"
              >
                <li className="mb-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">
                      {currentUser.displayName || "User"}
                    </span>
                    <span className="text-xs text-slate-500 break-all">
                      {currentUser.email}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="tooltip tooltip-bottom" data-tip="Logout">
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-circle"
              >
                <LogOut className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
