"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  BarChart3,
  Star,
  Copy,
  Archive,
  Download,
  CheckCircle2,
  AlertCircle,
  Grid3x3,
  List,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function CoursesPage() {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Dummy courses data with more details
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      students: 245,
      status: "published",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      category: "Web Development",
      duration: "8 weeks",
      price: 99.99,
      rating: 4.8,
      totalRatings: 156,
      revenue: 24497.55,
      completionRate: 78,
      createdAt: "2024-01-15",
      lastUpdated: "2 days ago",
      lessons: 45,
      enrollmentTrend: "+12%",
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      description: "Master modern React and Next.js development",
      students: 189,
      status: "published",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
      category: "Web Development",
      duration: "10 weeks",
      price: 149.99,
      rating: 4.9,
      totalRatings: 203,
      revenue: 28348.11,
      completionRate: 85,
      createdAt: "2024-02-01",
      lastUpdated: "1 week ago",
      lessons: 62,
      enrollmentTrend: "+8%",
    },
    {
      id: 3,
      title: "Database Design & SQL Mastery",
      description: "Complete guide to database design and SQL",
      students: 156,
      status: "published",
      thumbnail:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500",
      category: "Data Science",
      duration: "6 weeks",
      price: 89.99,
      rating: 4.7,
      totalRatings: 128,
      revenue: 14038.44,
      completionRate: 72,
      createdAt: "2024-02-10",
      lastUpdated: "3 days ago",
      lessons: 38,
      enrollmentTrend: "+15%",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Create beautiful and user-friendly interfaces",
      students: 98,
      status: "draft",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
      category: "Design",
      duration: "5 weeks",
      price: 79.99,
      rating: 0,
      totalRatings: 0,
      revenue: 0,
      completionRate: 0,
      createdAt: "2024-03-05",
      lastUpdated: "Today",
      lessons: 28,
      enrollmentTrend: "0%",
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis",
      students: 312,
      status: "published",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500",
      category: "Data Science",
      duration: "12 weeks",
      price: 129.99,
      rating: 4.9,
      totalRatings: 287,
      revenue: 40556.88,
      completionRate: 81,
      createdAt: "2023-12-01",
      lastUpdated: "5 days ago",
      lessons: 75,
      enrollmentTrend: "+5%",
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications",
      students: 167,
      status: "published",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      category: "Mobile Development",
      duration: "9 weeks",
      price: 139.99,
      rating: 4.6,
      totalRatings: 142,
      revenue: 23378.33,
      completionRate: 76,
      createdAt: "2024-01-20",
      lastUpdated: "1 day ago",
      lessons: 54,
      enrollmentTrend: "+10%",
    },
  ];

  const categories = [
    "All Categories",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Design",
    "Business",
    "Marketing",
  ];

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.status === "published").length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
    avgRating:
      courses
        .filter((c) => c.rating > 0)
        .reduce((sum, c) => sum + c.rating, 0) /
      courses.filter((c) => c.rating > 0).length,
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle course selection
  const toggleCourseSelection = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const selectAllCourses = () => {
    if (selectedCourses.length === filteredCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(filteredCourses.map((c) => c.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on courses:`, selectedCourses);
    // Implement bulk actions here
    alert(`${action} action on ${selectedCourses.length} course(s)`);
  };

  // Handle delete
  const handleDelete = (courseId, courseName) => {
    if (confirm(`Are you sure you want to delete "${courseName}"?`)) {
      console.log("Deleting course:", courseId);
      // Implement delete logic
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            My Courses
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Manage and track all your courses
          </p>
        </div>
        <Link
          href="/dashboard/addCourse"
          className="btn bg-sky-600 hover:bg-sky-700 text-white border-none btn-sm sm:btn-md"
        >
          <Plus className="h-4 w-4" />
          Create Course
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Total Courses</p>
              <p className="text-xl font-bold text-slate-800">
                {stats.totalCourses}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Published</p>
              <p className="text-xl font-bold text-slate-800">
                {stats.publishedCourses}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Total Students</p>
              <p className="text-xl font-bold text-slate-800">
                {stats.totalStudents}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Total Revenue</p>
              <p className="text-xl font-bold text-slate-800">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Avg Rating</p>
              <p className="text-xl font-bold text-slate-800">
                {stats.avgRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select select-bordered w-full lg:w-48"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered w-full lg:w-48"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`btn btn-square ${
                viewMode === "grid" ? "bg-sky-600 text-white" : "btn-ghost"
              }`}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`btn btn-square ${
                viewMode === "list" ? "bg-sky-600 text-white" : "btn-ghost"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCourses.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600">
                {selectedCourses.length} course(s) selected
              </span>
              <button
                onClick={() => handleBulkAction("publish")}
                className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                Publish
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                className="btn btn-sm btn-outline"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                onClick={() => setSelectedCourses([])}
                className="btn btn-sm btn-ghost"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Courses Display */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <BookOpen className="h-16 w-16 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No courses found
          </h3>
          <p className="text-slate-600 mb-6">
            {searchTerm || filterStatus !== "all" || filterCategory !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first course"}
          </p>
          {!searchTerm &&
            filterStatus === "all" &&
            filterCategory === "all" && (
              <Link
                href="/dashboard/courses/new"
                className="btn bg-sky-600 hover:bg-sky-700 text-white border-none"
              >
                <Plus className="h-4 w-4" />
                Create Your First Course
              </Link>
            )}
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-lg transition-all overflow-hidden ${
                selectedCourses.includes(course.id)
                  ? "border-sky-500 ring-2 ring-sky-200"
                  : "border-slate-200"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-slate-200 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="btn btn-sm bg-white hover:bg-slate-100 text-slate-800 border-none"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                  <Link
                    href={`/dashboard/courses/${course.id}/edit`}
                    className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                </div>

                {/* Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => toggleCourseSelection(course.id)}
                    className="checkbox checkbox-sm bg-white"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`badge ${
                      course.status === "published"
                        ? "bg-green-500 text-white"
                        : "bg-amber-500 text-white"
                    } border-none`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 line-clamp-2 flex-1">
                    {course.title}
                  </h3>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-sm btn-circle"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 border border-slate-200 z-10"
                    >
                      <li>
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Eye className="h-4 w-4" />
                          View Details
                        </Link>
                      </li>
                      <li>
                        <Link href={`/dashboard/courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          Edit Course
                        </Link>
                      </li>
                      <li>
                        <button>
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </button>
                      </li>
                      <li>
                        <button>
                          <Download className="h-4 w-4" />
                          Export Data
                        </button>
                      </li>
                      <li>
                        <button>
                          <Archive className="h-4 w-4" />
                          Archive
                        </button>
                      </li>
                      <li className="border-t border-slate-200 mt-2 pt-2">
                        <button
                          onClick={() => handleDelete(course.id, course.title)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-sm bg-sky-50 text-sky-700 border-sky-200">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {course.lessons} lessons
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  {course.status === "published" && (
                    <>
                      <div className="flex items-center gap-1 text-amber-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span>
                          {course.rating} ({course.totalRatings})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>{course.enrollmentTrend}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Revenue & Progress */}
                {course.status === "published" && (
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Revenue</span>
                      <span className="font-semibold text-green-600">
                        ${course.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Completion Rate</span>
                      <span className="font-semibold text-sky-600">
                        {course.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-sky-600 h-1.5 rounded-full"
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-lg font-bold text-sky-600">
                    ${course.price}
                  </span>
                  <span className="text-xs text-slate-500">
                    Updated {course.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-slate-50">
                <tr>
                  <th className="w-12">
                    <input
                      type="checkbox"
                      checked={
                        selectedCourses.length === filteredCourses.length &&
                        filteredCourses.length > 0
                      }
                      onChange={selectAllCourses}
                      className="checkbox checkbox-sm"
                    />
                  </th>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Revenue</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourseSelection(course.id)}
                        className="checkbox checkbox-sm"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-lg">
                            <img src={course.thumbnail} alt={course.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {course.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {course.lessons} lessons • {course.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-sm bg-sky-50 text-sky-700 border-sky-200">
                        {course.category}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          course.status === "published"
                            ? "bg-green-500 text-white"
                            : "bg-amber-500 text-white"
                        } border-none`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        {course.students}
                      </div>
                    </td>
                    <td>
                      {course.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-current" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-xs text-slate-500">
                            ({course.totalRatings})
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td>
                      <span className="font-semibold text-green-600">
                        ${course.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <span className="font-semibold text-sky-600">
                        ${course.price}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/courses/${course.id}`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/courses/${course.id}/edit`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-sm btn-square"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 border border-slate-200 z-10"
                          >
                            <li>
                              <button>
                                <BarChart3 className="h-4 w-4" />
                                View Analytics
                              </button>
                            </li>
                            <li>
                              <button>
                                <Copy className="h-4 w-4" />
                                Duplicate
                              </button>
                            </li>
                            <li>
                              <button>
                                <Download className="h-4 w-4" />
                                Export Data
                              </button>
                            </li>
                            <li>
                              <button>
                                <Archive className="h-4 w-4" />
                                Archive
                              </button>
                            </li>
                            <li className="border-t border-slate-200 mt-2 pt-2">
                              <button
                                onClick={() =>
                                  handleDelete(course.id, course.title)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination (Optional) */}
      {filteredCourses.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="text-sm text-slate-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
          <div className="join">
            <button className="join-item btn btn-sm">«</button>
            <button className="join-item btn btn-sm btn-active">1</button>
            <button className="join-item btn btn-sm">2</button>
            <button className="join-item btn btn-sm">3</button>
            <button className="join-item btn btn-sm">»</button>
          </div>
        </div>
      )}
    </div>
  );
}
