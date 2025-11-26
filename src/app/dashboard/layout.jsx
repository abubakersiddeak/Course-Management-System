"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Settings,
  FileText,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Bell,
  Search,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navigationLinks = [
  {
    href: "/dashboard",
    title: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/myCourses",
    title: "My Courses",
    icon: BookOpen,
  },
  {
    href: "/dashboard/myEnrolled",
    title: "Enrolled Courses",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/students",
    title: "Students",
    icon: Users,
  },
  {
    href: "/dashboard/assignments",
    title: "Assignments",
    icon: FileText,
  },
  {
    href: "/dashboard/analytics",
    title: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/dashboard/settings",
    title: "Settings",
    icon: Settings,
  },
];

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // যদি currentUser না থাকে বা email empty থাকে
    if (!currentUser || !currentUser.email) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, router, pathname]);

  // লোডিং বা redirect হলে page render না করার জন্য
  if (!currentUser || !currentUser.email) {
    return <p>Redirecting...</p>;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDesktopSidebar = () => {
    setDesktopSidebarCollapsed(!desktopSidebarCollapsed);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar - Mobile & Desktop */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Left Side - Menu Toggle & Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-sm btn-circle lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={toggleDesktopSidebar}
              className="hidden lg:flex btn btn-ghost btn-sm btn-circle"
              aria-label="Toggle sidebar"
            >
              {desktopSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>

            {/* Logo - Show on mobile when menu is closed */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 ${
                mobileMenuOpen ? "lg:flex hidden" : "flex"
              }`}
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-sky-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h2 className="font-bold text-slate-800 text-sm lg:text-base">
                  LearnHub Dashboard
                </h2>
              </div>
            </Link>
          </div>

          {/* Right Side - Search, Notifications, Profile */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search - Hidden on small mobile */}
            <div className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-sm lg:input-md input-bordered w-32 sm:w-48 lg:w-64 pl-9 focus:outline-sky-500"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Search Icon - Mobile Only */}
            <button className="btn btn-ghost btn-sm btn-circle sm:hidden">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="btn btn-ghost btn-sm btn-circle relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile - Compact */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar btn-sm lg:btn-md"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
                  {currentUser?.photoURL ? (
                    <Image
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || currentUser.email}
                      className="w-full h-full object-cover"
                      width={36}
                      height={36}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-sky-700">
                      {currentUser?.displayName?.[0] ||
                        currentUser?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-white rounded-box w-52 border border-slate-200"
              >
                <li className="mb-2 px-2 py-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">
                      {currentUser?.displayName || "User"}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {currentUser?.email}
                    </span>
                  </div>
                </li>
                <li>
                  <Link href="/dashboard/settings">Settings</Link>
                </li>
                <li>
                  <Link href="/">Back to Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Sidebar - Mobile & Desktop */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50 lg:z-10
            bg-white border-r border-slate-200
            transition-all duration-300 ease-in-out
            flex flex-col
            h-screen lg:h-[calc(100vh-65px)]
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            ${desktopSidebarCollapsed ? "lg:w-20" : "lg:w-64"}
            lg:translate-x-0
            w-64
          `}
        >
          {/* Sidebar Header - Mobile Only */}
          <div className="p-4 border-b border-slate-200 lg:hidden">
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">LearnHub</h2>
                <p className="text-xs text-slate-500">Course Management</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg
                        transition-all duration-200 group relative
                        ${
                          isActive
                            ? "bg-sky-50 text-sky-700 font-semibold shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }
                        ${
                          desktopSidebarCollapsed
                            ? "lg:justify-center"
                            : "justify-start"
                        }
                      `}
                      title={desktopSidebarCollapsed ? link.title : ""}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span
                        className={`flex-1 ${
                          desktopSidebarCollapsed ? "lg:hidden" : "block"
                        }`}
                      >
                        {link.title}
                      </span>
                      {isActive && !desktopSidebarCollapsed && (
                        <ChevronRight className="h-4 w-4 text-sky-600 hidden lg:block" />
                      )}

                      {/* Tooltip for collapsed state */}
                      {desktopSidebarCollapsed && (
                        <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                          {link.title}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div
            className={`p-3 lg:p-4 border-t border-slate-200 ${
              desktopSidebarCollapsed ? "lg:hidden" : "block"
            }`}
          >
            <div className="bg-linear-to-br from-sky-50 to-sky-100 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-slate-800 mb-1">
                Need Help?
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Check our documentation
              </p>
              <Link
                href="/help"
                className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none w-full text-xs"
                onClick={closeMobileMenu}
              >
                Get Support
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className={`
            flex-1 w-full
            transition-all duration-300
            ${desktopSidebarCollapsed ? "lg:ml-0" : "lg:ml-0"}
          `}
        >
          {/* Breadcrumb - Desktop Only */}
          <div className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 hidden lg:block">
            <div className="flex items-center text-xs lg:text-sm text-slate-600">
              <Link href="/" className="hover:text-sky-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-slate-900 font-medium">Dashboard</span>
            </div>
          </div>

          {/* Page Content with Responsive Padding */}
          <div className="p-4 sm:p-5 lg:p-6 xl:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
