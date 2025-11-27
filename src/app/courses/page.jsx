"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CoursesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Fetch courses
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/allcourse`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await res.json();

        if (data.success) {
          setAllCourses(data.data);
        } else {
          throw new Error(data.message || "Failed to load courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Error Loading Courses",
          text: error.message || "Failed to load courses. Please try again.",
          confirmButtonColor: "#0EA5E9",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get unique categories from courses
  const getCategoryCounts = () => {
    const counts = {};
    allCourses.forEach((course) => {
      counts[course.category] = (counts[course.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  const categories = [
    { name: "All Categories", value: "all", count: allCourses.length },
    ...Object.keys(categoryCounts).map((cat) => ({
      name: cat,
      value: cat,
      count: categoryCounts[cat],
    })),
  ];

  // Filter and Search Logic
  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    const matchesLevel =
      selectedLevel === "all" ||
      selectedLevel.toLowerCase() === course.level.toLowerCase();

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        return (b.students || 0) - (a.students || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLevel, selectedPrice, searchQuery, sortBy]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCourseClick = (courseId) => {
    router.push(`/course/${courseId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <svg
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Failed to Load Courses
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
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

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, instructor, or description..."
                className="bg-sky-700 text-gray-200 w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 rounded-xl  focus:outline-none focus:ring-4 focus:ring-white/30 text-sm sm:text-base shadow-lg"
              />
              <svg
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-slate-200"
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="cursor-pointer w-full bg-white border-2 border-gray-200 hover:border-sky-500 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-md transition-all"
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
              <span className="bg-sky-600 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:w-72 shrink-0`}
          >
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-xl lg:sticky lg:top-24">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-sky-600"
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
                  className="cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
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

              <h3 className="hidden lg:flex font-bold text-slate-800 text-lg mb-6 items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br bg-sky-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
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
                </div>
                Filters
              </h3>

              {/* Sort - Mobile Only */}
              <div className="mb-6 lg:hidden">
                <h4 className="font-semibold text-slate-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none"
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
                <h4 className="font-semibold text-slate-700 mb-3">Category</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all ${
                        selectedCategory === cat.value
                          ? "bg-linear-to-r from-sky-50 to-purple-50 border-2 border-sky-300"
                          : "hover:bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-sky-600 focus:ring-2 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-700 flex-1 font-medium">
                        {cat.name}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-semibold">
                        {cat.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6 pt-6 border-t-2 border-gray-100">
                <h4 className="font-semibold text-slate-700 mb-3">Level</h4>
                <div className="space-y-2">
                  {["all", "beginner", "intermediate", "advanced"].map(
                    (level) => (
                      <label
                        key={level}
                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all ${
                          selectedLevel === level
                            ? "bg-linear-to-r from-sky-50 to-purple-50 border-2 border-sky-300"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={selectedLevel === level}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="w-4 h-4 text-sky-600 focus:ring-2 focus:ring-sky-500"
                        />
                        <span className="text-sm text-slate-700 capitalize font-medium">
                          {level === "all" ? "All Levels" : level}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6 pt-6 border-t-2 border-gray-100">
                <h4 className="font-semibold text-slate-700 mb-3">Price</h4>
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
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all ${
                        selectedPrice === price.value
                          ? "bg-linear-to-r from-sky-50 to-purple-50 border-2 border-sky-300"
                          : "hover:bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={selectedPrice === price.value}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="w-4 h-4 text-sky-600 focus:ring-2 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-700 font-medium">
                        {price.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setSelectedPrice("all");
                    setSearchQuery("");
                    setSortBy("popular");
                  }}
                  className="cursor-pointer w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Reset All Filters
                </button>

                {/* Apply Button - Mobile Only */}
                <button
                  onClick={() => setShowFilters(false)}
                  className="cursor-pointer w-full px-4 py-3  bg-sky-500 hover:bg-sky-600  text-white rounded-xl font-semibold shadow-lg lg:hidden"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-semibold">
                    {sortedCourses.length}{" "}
                    {sortedCourses.length === 1 ? "course" : "courses"} found
                  </span>
                  {(selectedCategory !== "all" ||
                    selectedLevel !== "all" ||
                    selectedPrice !== "all" ||
                    searchQuery) && (
                    <span className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                      Filtered
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort Dropdown - Desktop Only */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="hidden lg:block px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none font-medium"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 transition-all cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-linear-to-r bg-sky-500  text-white"
                          : "bg-white text-slate-600 hover:bg-gray-50"
                      }`}
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
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 transition-all cursor-pointer${
                        viewMode === "list"
                          ? "bg-linear-to-r bg-sky-500  text-white"
                          : "bg-white text-slate-600 hover:bg-gray-50"
                      }`}
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
              <div className="cursor-pointer bg-white rounded-2xl border-2 border-gray-100 p-12 text-center shadow-lg">
                <svg
                  className="h-20 w-20 text-slate-400 mx-auto mb-4"
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
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  No courses found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setSelectedPrice("all");
                    setSearchQuery("");
                    setSortBy("popular");
                  }}
                  className="cursor-pointer  bg-sky-500  hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && currentCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => handleCourseClick(course._id)}
                    className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer transform hover:scale-105"
                  >
                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        // fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {course.bestseller && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ⭐ BESTSELLER
                          </span>
                        </div>
                      )}
                      {course.originalPrice > course.price && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {Math.round(
                              ((course.originalPrice - course.price) /
                                course.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-linear-to-r from-sky-50 to-purple-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-semibold">
                          {course.category}
                        </span>
                        <span className="text-xs border-2 border-gray-200 px-3 py-1 rounded-full capitalize font-medium">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors min-h-14">
                        {course.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {course.instructor}
                      </p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4 text-amber-500 fill-amber-500"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold">
                            {course.rating > 0
                              ? course.rating.toFixed(1)
                              : "New"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4 text-blue-500"
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
                          <span>{(course.students || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                        <div>
                          <div className="text-2xl font-bold bg-linear-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                            ${course.price}
                          </div>
                          {course.originalPrice > course.price && (
                            <div className="text-sm text-slate-400 line-through">
                              ${course.originalPrice}
                            </div>
                          )}
                        </div>
                        <button className="cursor-pointer bg-linear-to-r bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && currentCourses.length > 0 && (
              <div className="space-y-6">
                {currentCourses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => handleCourseClick(course._id)}
                    className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Course Image */}
                      <div className="relative w-full md:w-80 h-48 md:h-auto shrink-0">
                        <img
                          src={course.image}
                          alt={course.title}
                          // fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {course.bestseller && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              ⭐ BESTSELLER
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-linear-to-r from-sky-50 to-purple-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-semibold">
                              {course.category}
                            </span>
                            <span className="text-xs border-2 border-gray-200 px-3 py-1 rounded-full capitalize">
                              {course.level}
                            </span>
                          </div>
                          {course.originalPrice > course.price && (
                            <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              {Math.round(
                                ((course.originalPrice - course.price) /
                                  course.originalPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-slate-600 mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        <p className="text-sm text-slate-600 mb-4 flex items-center gap-2">
                          <svg
                            className="h-4 w-4 text-purple-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {course.instructor}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-amber-500 fill-amber-500"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold">
                              {course.rating > 0
                                ? course.rating.toFixed(1)
                                : "New"}
                            </span>
                            <span className="text-slate-400">
                              ({(course.reviews || 0).toLocaleString()})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-blue-500"
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
                            <span>
                              {(course.students || 0).toLocaleString()} students
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-green-500"
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
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                          <div>
                            <div className="text-3xl font-bold bg-linear-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                              ${course.price}
                            </div>
                            {course.originalPrice > course.price && (
                              <div className="text-sm text-slate-400 line-through">
                                ${course.originalPrice}
                              </div>
                            )}
                          </div>
                          <button className="cursor-pointer bg-linear-to-r bg-sky-500 hover:bg-sky-600  text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all">
                            View Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedCourses.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="cursor-pointer px-4 py-2 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-sky-500 transition-all"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                            currentPage === pageNumber
                              ? "bg-linear-to-r bg-sky-500  text-white shadow-lg"
                              : "border-2 border-gray-200 hover:border-sky-500"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber}>...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer px-4 py-2 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-sky-500 transition-all "
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0ea5e9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0284c7;
        }
      `}</style>
    </div>
  );
}
