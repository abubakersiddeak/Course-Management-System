"use client";

import { useState } from "react";
import Link from "next/link";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // All Courses Data
  const allCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      rating: 4.8,
      reviews: 12453,
      students: 45230,
      price: 99.99,
      originalPrice: 199.99,
      duration: "52 hours",
      lessons: 65,
      level: "Beginner",
      bestseller: true,
      updated: "2024-01",
      description:
        "Master web development with HTML, CSS, JavaScript, React, Node.js and more",
      tags: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      id: 2,
      title: "Advanced React & Next.js Development",
      instructor: "Maximilian Schwarzmüller",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
      rating: 4.9,
      reviews: 8234,
      students: 32100,
      price: 129.99,
      originalPrice: 249.99,
      duration: "40 hours",
      lessons: 52,
      level: "Advanced",
      bestseller: false,
      updated: "2024-02",
      description: "Build modern web applications with React 18 and Next.js 14",
      tags: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 3,
      title: "Python for Data Science & Machine Learning",
      instructor: "Jose Portilla",
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500",
      rating: 4.7,
      reviews: 15678,
      students: 62450,
      price: 149.99,
      originalPrice: 299.99,
      duration: "60 hours",
      lessons: 78,
      level: "Intermediate",
      bestseller: true,
      updated: "2024-01",
      description:
        "Learn Python, NumPy, Pandas, Matplotlib, Scikit-Learn and Machine Learning",
      tags: ["Python", "ML", "Data Science"],
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Daniel Walter Scott",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
      rating: 4.9,
      reviews: 9876,
      students: 28900,
      price: 119.99,
      originalPrice: 229.99,
      duration: "45 hours",
      lessons: 58,
      level: "All Levels",
      bestseller: false,
      updated: "2024-02",
      description:
        "Master Figma, Adobe XD, and design principles to create stunning interfaces",
      tags: ["Figma", "UI/UX", "Design"],
    },
    {
      id: 5,
      title: "Digital Marketing Complete Course",
      instructor: "Phil Ebiner",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      rating: 4.6,
      reviews: 11234,
      students: 41200,
      price: 89.99,
      originalPrice: 179.99,
      duration: "35 hours",
      lessons: 45,
      level: "Beginner",
      bestseller: false,
      updated: "2023-12",
      description:
        "Learn SEO, Social Media Marketing, Email Marketing, and Google Ads",
      tags: ["SEO", "Social Media", "Ads"],
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      instructor: "Stephen Grider",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      rating: 4.8,
      reviews: 7654,
      students: 25300,
      price: 139.99,
      originalPrice: 269.99,
      duration: "48 hours",
      lessons: 62,
      level: "Intermediate",
      bestseller: true,
      updated: "2024-02",
      description:
        "Build iOS and Android apps with React Native and JavaScript",
      tags: ["React Native", "Mobile", "iOS", "Android"],
    },
    {
      id: 7,
      title: "Full Stack JavaScript Developer",
      instructor: "Brad Traversy",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500",
      rating: 4.7,
      reviews: 13450,
      students: 38700,
      price: 109.99,
      originalPrice: 219.99,
      duration: "55 hours",
      lessons: 70,
      level: "Intermediate",
      bestseller: true,
      updated: "2024-01",
      description:
        "Master the MERN stack: MongoDB, Express, React, and Node.js",
      tags: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      id: 8,
      title: "AWS Certified Solutions Architect",
      instructor: "Ryan Kroonenburg",
      category: "Cloud Computing",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
      rating: 4.8,
      reviews: 9230,
      students: 31200,
      price: 159.99,
      originalPrice: 319.99,
      duration: "42 hours",
      lessons: 56,
      level: "Advanced",
      bestseller: false,
      updated: "2024-02",
      description:
        "Prepare for AWS certification with hands-on projects and practice exams",
      tags: ["AWS", "Cloud", "DevOps"],
    },
    {
      id: 9,
      title: "Graphic Design Bootcamp",
      instructor: "Lindsay Marsh",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500",
      rating: 4.6,
      reviews: 6780,
      students: 19500,
      price: 94.99,
      originalPrice: 189.99,
      duration: "38 hours",
      lessons: 48,
      level: "Beginner",
      bestseller: false,
      updated: "2023-11",
      description: "Master Adobe Photoshop, Illustrator, and InDesign",
      tags: ["Photoshop", "Illustrator", "Design"],
    },
    {
      id: 10,
      title: "Blockchain & Cryptocurrency Course",
      instructor: "Ivan on Tech",
      category: "Blockchain",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500",
      rating: 4.7,
      reviews: 5432,
      students: 15800,
      price: 169.99,
      originalPrice: 339.99,
      duration: "50 hours",
      lessons: 64,
      level: "Advanced",
      bestseller: false,
      updated: "2024-01",
      description:
        "Learn blockchain technology, smart contracts, and cryptocurrency trading",
      tags: ["Blockchain", "Crypto", "Web3"],
    },
    {
      id: 11,
      title: "Complete Excel Mastery Course",
      instructor: "Kyle Pew",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      rating: 4.8,
      reviews: 14567,
      students: 52300,
      price: 79.99,
      originalPrice: 159.99,
      duration: "30 hours",
      lessons: 42,
      level: "All Levels",
      bestseller: true,
      updated: "2023-12",
      description:
        "Master Excel from basics to advanced features, macros, and VBA",
      tags: ["Excel", "Business", "Data Analysis"],
    },
    {
      id: 12,
      title: "Photography Masterclass",
      instructor: "Phil Ebiner",
      category: "Photography",
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500",
      rating: 4.9,
      reviews: 8901,
      students: 27600,
      price: 99.99,
      originalPrice: 199.99,
      duration: "44 hours",
      lessons: 56,
      level: "Beginner",
      bestseller: false,
      updated: "2024-02",
      description:
        "Learn photography from basics to advanced techniques and editing",
      tags: ["Photography", "Lightroom", "Camera"],
    },
  ];

  // Categories
  const categories = [
    { name: "All Categories", value: "all", count: allCourses.length },
    {
      name: "Web Development",
      value: "Web Development",
      count: allCourses.filter((c) => c.category === "Web Development").length,
    },
    {
      name: "Data Science",
      value: "Data Science",
      count: allCourses.filter((c) => c.category === "Data Science").length,
    },
    {
      name: "Design",
      value: "Design",
      count: allCourses.filter((c) => c.category === "Design").length,
    },
    {
      name: "Marketing",
      value: "Marketing",
      count: allCourses.filter((c) => c.category === "Marketing").length,
    },
    {
      name: "Mobile Development",
      value: "Mobile Development",
      count: allCourses.filter((c) => c.category === "Mobile Development")
        .length,
    },
    {
      name: "Cloud Computing",
      value: "Cloud Computing",
      count: allCourses.filter((c) => c.category === "Cloud Computing").length,
    },
    {
      name: "Blockchain",
      value: "Blockchain",
      count: allCourses.filter((c) => c.category === "Blockchain").length,
    },
    {
      name: "Business",
      value: "Business",
      count: allCourses.filter((c) => c.category === "Business").length,
    },
    {
      name: "Photography",
      value: "Photography",
      count: allCourses.filter((c) => c.category === "Photography").length,
    },
  ];

  // Filter and Search Logic
  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesPrice = true;
    if (selectedPrice === "free") matchesPrice = course.price === 0;
    else if (selectedPrice === "paid") matchesPrice = course.price > 0;
    else if (selectedPrice === "under50") matchesPrice = course.price < 50;
    else if (selectedPrice === "50-100")
      matchesPrice = course.price >= 50 && course.price <= 100;
    else if (selectedPrice === "over100") matchesPrice = course.price > 100;

    return matchesCategory && matchesLevel && matchesSearch && matchesPrice;
  });

  // Sort Logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.updated) - new Date(a.updated);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-linear-to-r from-sky-600 to-sky-700 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Explore Our Courses
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-sky-100 mb-6 sm:mb-8">
              Choose from over {allCourses.length} online courses with new
              additions published every month
            </p>

            {/* Search Bar - Mobile Optimized */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm sm:text-base"
              />
              <svg
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full btn bg-white border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters & Sort
            {(selectedCategory !== "all" ||
              selectedLevel !== "all" ||
              selectedPrice !== "all") && (
              <span className="badge badge-sm bg-sky-600 text-white border-none">
                Active
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters - Mobile Drawer */}
          <aside
            className={`
              ${showFilters ? "block" : "hidden"} lg:block
              lg:w-64 shrink-0
            `}
          >
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-24">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-sky-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <h3 className="hidden lg:flex font-bold text-slate-800 mb-4 items-center gap-2">
                <svg
                  className="h-5 w-5 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </h3>

              {/* Sort - Mobile Only */}
              <div className="mb-6 lg:hidden">
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">
                  Sort By
                </h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">
                  Category
                </h4>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="radio radio-sm radio-primary"
                      />
                      <span className="text-sm text-slate-600 flex-1">
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">
                  Level
                </h4>
                <div className="space-y-2">
                  {[
                    "all",
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                    "All Levels",
                  ].map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={selectedLevel === level}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="radio radio-sm radio-primary"
                      />
                      <span className="text-sm text-slate-600">
                        {level === "all" ? "All Levels" : level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">
                  Price
                </h4>
                <div className="space-y-2">
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "Free", value: "free" },
                    { label: "Paid", value: "paid" },
                    { label: "Under $50", value: "under50" },
                    { label: "$50 - $100", value: "50-100" },
                    { label: "Over $100", value: "over100" },
                  ].map((price) => (
                    <label
                      key={price.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={selectedPrice === price.value}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="radio radio-sm radio-primary"
                      />
                      <span className="text-sm text-slate-600">
                        {price.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSelectedPrice("all");
                  setSearchQuery("");
                  setShowFilters(false);
                }}
                className="w-full btn btn-sm btn-outline text-sky-600 border-sky-300 hover:bg-sky-50"
              >
                Reset Filters
              </button>

              {/* Apply Button - Mobile Only */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none mt-3 lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar - Mobile Optimized */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="text-slate-600">
                    {sortedCourses.length}{" "}
                    {sortedCourses.length === 1 ? "course" : "courses"}
                  </span>
                  {(selectedCategory !== "all" ||
                    selectedLevel !== "all" ||
                    selectedPrice !== "all" ||
                    searchQuery) && (
                    <span className="text-xs sm:text-sm text-slate-500">
                      (filtered)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Sort Dropdown - Desktop Only */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="hidden lg:block select select-bordered select-sm flex-1 sm:flex-none"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-2 sm:px-3 py-2 ${
                        viewMode === "grid"
                          ? "bg-sky-600 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                      aria-label="Grid view"
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-2 sm:px-3 py-2 ${
                        viewMode === "list"
                          ? "bg-sky-600 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                      aria-label="List view"
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {sortedCourses.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
                <svg
                  className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                  No courses found
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setSelectedPrice("all");
                    setSearchQuery("");
                  }}
                  className="btn bg-sky-600 hover:bg-sky-700 text-white border-none btn-sm sm:btn-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Grid View - Mobile Optimized */}
            {viewMode === "grid" && sortedCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {sortedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
                  >
                    {/* Course Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {course.bestseller && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                          <span className="bg-amber-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                            BESTSELLER
                          </span>
                        </div>
                      )}
                      {course.originalPrice > course.price && (
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {Math.round(
                              ((course.originalPrice - course.price) /
                                course.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link
                          href={`/courses/${course.id}`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center"
                        >
                          <svg
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Course Content - Mobile Optimized */}
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 sm:py-1 rounded truncate">
                          {course.category}
                        </span>
                        <span className="text-xs border border-slate-300 px-2 py-0.5 sm:py-1 rounded">
                          {course.level}
                        </span>
                      </div>

                      <Link href={`/courses/${course.id}`}>
                        <h3 className="font-bold text-sm sm:text-base text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors min-h-10 sm:min-h-12">
                          {course.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 mb-3 truncate">
                        {course.instructor}
                      </p>

                      <div className="flex items-center gap-2 sm:gap-4 mb-3 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <svg
                            className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 fill-amber-500"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold">{course.rating}</span>
                          <span className="hidden sm:inline text-slate-400">
                            ({course.reviews.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <svg
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="h-3 w-3 sm:h-4 sm:w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <span>{course.lessons}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div>
                          <div className="text-xl sm:text-2xl font-bold text-sky-600">
                            ${course.price}
                          </div>
                          {course.originalPrice > course.price && (
                            <div className="text-xs text-slate-400 line-through">
                              ${course.originalPrice}
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/courses/${course.id}`}
                          className="bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg transition-colors"
                        >
                          Enroll
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View - Mobile Optimized */}
            {viewMode === "list" && sortedCourses.length > 0 && (
              <div className="space-y-4">
                {sortedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Course Image - Mobile Optimized */}
                      <div className="relative w-full sm:w-48 md:w-64 h-40 sm:h-auto flex-shrink-0 overflow-hidden group">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {course.bestseller && (
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                              BESTSELLER
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Course Content - Mobile Optimized */}
                      <div className="flex-1 p-4 sm:p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 rounded">
                                  {course.category}
                                </span>
                                <span className="text-xs border border-slate-300 px-2 py-1 rounded">
                                  {course.level}
                                </span>
                              </div>
                              {course.originalPrice > course.price && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                  {Math.round(
                                    ((course.originalPrice - course.price) /
                                      course.originalPrice) *
                                      100
                                  )}
                                  % OFF
                                </span>
                              )}
                            </div>

                            <Link href={`/courses/${course.id}`}>
                              <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-2 hover:text-sky-600 transition-colors line-clamp-2">
                                {course.title}
                              </h3>
                            </Link>

                            <p className="text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-1">
                              {course.description}
                            </p>

                            <p className="text-xs sm:text-sm text-slate-600 mb-3">
                              By{" "}
                              <span className="font-medium">
                                {course.instructor}
                              </span>
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 mb-3">
                              <div className="flex items-center gap-1">
                                <svg
                                  className="h-4 w-4 text-amber-500 fill-amber-500"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">
                                  {course.rating}
                                </span>
                                <span className="hidden sm:inline text-slate-400">
                                  ({course.reviews.toLocaleString()})
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                                <span className="hidden sm:inline">
                                  {course.students.toLocaleString()}
                                </span>
                                <span className="sm:hidden">
                                  {(course.students / 1000).toFixed(0)}k
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {course.duration}
                              </div>
                              <div className="hidden sm:flex items-center gap-1">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                  />
                                </svg>
                                {course.lessons} lectures
                              </div>
                            </div>

                            {/* Tags - Desktop Only */}
                            <div className="hidden sm:flex flex-wrap gap-2 mb-3">
                              {course.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
                            <div>
                              <div className="text-xl sm:text-2xl font-bold text-sky-600">
                                ${course.price}
                              </div>
                              {course.originalPrice > course.price && (
                                <div className="text-xs sm:text-sm text-slate-400 line-through">
                                  ${course.originalPrice}
                                </div>
                              )}
                            </div>
                            <Link
                              href={`/courses/${course.id}`}
                              className="bg-sky-600 hover:bg-sky-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-center text-sm sm:text-base"
                            >
                              View Course
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination - Mobile Optimized */}
            {sortedCourses.length > 0 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <div className="join">
                  <button className="join-item btn btn-sm sm:btn-md">«</button>
                  <button className="join-item btn btn-sm sm:btn-md btn-active">
                    1
                  </button>
                  <button className="join-item btn btn-sm sm:btn-md">2</button>
                  <button className="join-item btn btn-sm sm:btn-md hidden sm:inline-flex">
                    3
                  </button>
                  <button className="join-item btn btn-sm sm:btn-md hidden sm:inline-flex">
                    4
                  </button>
                  <button className="join-item btn btn-sm sm:btn-md">»</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
