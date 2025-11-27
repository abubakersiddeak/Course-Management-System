"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Star,
  Copy,
  Archive,
  CheckCircle2,
  Grid3x3,
  List,
  Loader2,
  RefreshCw,
  X,
  Save,
  Upload,
  AlertCircle,
  Link2,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CoursesPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    level: "",
    language: "",
    imageUrl: "",
    status: "draft",
    syllabus: [],
    prerequisites: [],
    learningOutcomes: [],
  });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Available options
  const categoryOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "AI & Robotics",
    "Game Development",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Health & Fitness",
    "Language Learning",
    "Personal Development",
  ];

  const levelOptions = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Russian",
  ];

  // Fetch instructor's courses
  useEffect(() => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please login to view your courses",
        confirmButtonColor: "#0EA5E9",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    fetchCourses();
  }, [currentUser]);

  const fetchCourses = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/instructor/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch courses");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error Loading Courses",
        text: err.message || "Failed to load your courses",
        confirmButtonColor: "#0EA5E9",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = [
    "All Categories",
    ...new Set(courses.map((c) => c.category).filter(Boolean)),
  ];

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.status === "published").length,
    draftCourses: courses.filter((c) => c.status === "draft").length,
    totalStudents: courses.reduce((sum, c) => sum + (c.students || 0), 0),
    totalRevenue: courses.reduce(
      (sum, c) => sum + (c.students || 0) * (c.price || 0),
      0
    ),
    avgRating:
      courses.filter((c) => c.rating > 0).length > 0
        ? courses
            .filter((c) => c.rating > 0)
            .reduce((sum, c) => sum + c.rating, 0) /
          courses.filter((c) => c.rating > 0).length
        : 0,
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" ||
      filterCategory === "All Categories" ||
      course.category === filterCategory;
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
      setSelectedCourses(filteredCourses.map((c) => c._id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Multiple Courses?",
      html: `Are you sure you want to delete <strong>${selectedCourses.length}</strong> course(s)?<br><span class="text-red-600">This action cannot be undone!</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete them!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const token = await currentUser.getIdToken();
        const deletePromises = selectedCourses.map((courseId) =>
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${courseId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        const results = await Promise.all(deletePromises);
        const failedDeletes = results.filter((r) => !r.ok);

        if (failedDeletes.length === 0) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${selectedCourses.length} course(s) deleted successfully`,
            timer: 2000,
            showConfirmButton: false,
          });
          setSelectedCourses([]);
          fetchCourses();
        } else {
          throw new Error(`Failed to delete ${failedDeletes.length} course(s)`);
        }
      } catch (err) {
        console.error("Bulk delete error:", err);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Failed to delete courses",
          confirmButtonColor: "#0EA5E9",
        });
      }
    }
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = async (newStatus) => {
    const result = await Swal.fire({
      title: `${newStatus === "published" ? "Publish" : "Archive"} Courses?`,
      text: `This will ${newStatus} ${selectedCourses.length} course(s)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA5E9",
      cancelButtonColor: "#64748B",
      confirmButtonText: `Yes, ${newStatus}!`,
    });

    if (result.isConfirmed) {
      try {
        const token = await currentUser.getIdToken();
        const updatePromises = selectedCourses.map(async (courseId) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${courseId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: newStatus }),
            }
          );

          if (!response.ok) {
            const text = await response.text();
            console.error(`Failed to update course ${courseId}:`, text);
          }

          return response;
        });

        const results = await Promise.all(updatePromises);
        const failedUpdates = results.filter((r) => !r.ok);

        if (failedUpdates.length === 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `${selectedCourses.length} course(s) ${newStatus} successfully`,
            timer: 2000,
            showConfirmButton: false,
          });
          setSelectedCourses([]);
          fetchCourses();
        } else {
          throw new Error(`Failed to update ${failedUpdates.length} course(s)`);
        }
      } catch (err) {
        console.error("Bulk update error:", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message || "Failed to update courses",
          confirmButtonColor: "#0EA5E9",
        });
      }
    }
  };

  // Handle edit - Open modal
  const handleEdit = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    if (course) {
      setEditingCourse(course);
      setEditFormData({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        price: course.price || "",
        duration: course.duration || "",
        level: course.level || "Beginner",
        language: course.language || "English",
        imageUrl: course.image || "",
        status: course.status || "draft",
        syllabus: course.syllabus || [],
        prerequisites: course.prerequisites || [],
        learningOutcomes: course.learningOutcomes || [],
      });
      setEditFormErrors({});
      setIsEditModalOpen(true);
    }
  };

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Validate edit form
  const validateEditForm = () => {
    const errors = {};

    if (!editFormData.title.trim()) {
      errors.title = "Title is required";
    } else if (editFormData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!editFormData.description.trim()) {
      errors.description = "Description is required";
    } else if (editFormData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!editFormData.category) {
      errors.category = "Category is required";
    }

    if (!editFormData.price) {
      errors.price = "Price is required";
    } else if (
      isNaN(editFormData.price) ||
      parseFloat(editFormData.price) < 0
    ) {
      errors.price = "Price must be a valid positive number";
    }

    if (!editFormData.duration.trim()) {
      errors.duration = "Duration is required";
    }

    if (!editFormData.level) {
      errors.level = "Level is required";
    }

    if (!editFormData.language) {
      errors.language = "Language is required";
    }

    if (editFormData.imageUrl && !isValidUrl(editFormData.imageUrl)) {
      errors.imageUrl = "Please enter a valid URL";
    }

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (editFormErrors[name]) {
      setEditFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!validateEditForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all errors before saving",
        confirmButtonColor: "#0EA5E9",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to update this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA5E9",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, save!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsSaving(true);
      try {
        const token = await currentUser.getIdToken();

        // Prepare data according to backend API
        const requestBody = {
          title: editFormData.title,
          description: editFormData.description,
          category: editFormData.category,
          level: editFormData.level,
          price: editFormData.price,
          duration: editFormData.duration,
          imageUrl: editFormData.imageUrl,
          syllabus: editFormData.syllabus,
          prerequisites: editFormData.prerequisites,
          learningOutcomes: editFormData.learningOutcomes,
          status: editFormData.status,
        };

        console.log("Sending update request:", requestBody);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${editingCourse._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error(
            "Server returned invalid response. Please check the API endpoint."
          );
        }

        const data = await response.json();

        if (response.ok && data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Course updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          setIsEditModalOpen(false);
          fetchCourses();
        } else {
          throw new Error(data.message || "Failed to update course");
        }
      } catch (err) {
        console.error("Update error:", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message || "Failed to update course",
          confirmButtonColor: "#0EA5E9",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Handle delete single course
  const handleDelete = async (courseId, courseName) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      html: `Are you sure you want to delete <strong>"${courseName}"</strong>?<br><span class="text-red-600">This action cannot be undone!</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      input: "checkbox",
      inputPlaceholder: "I understand this action is permanent",
      inputValidator: (result) => {
        return !result && "You must confirm to delete";
      },
    });

    if (result.isConfirmed) {
      try {
        const token = await currentUser.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${courseId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Course has been deleted successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchCourses();
        } else {
          throw new Error(data.message || "Failed to delete course");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Failed to delete course",
          confirmButtonColor: "#0EA5E9",
        });
      }
    }
  };

  // Handle duplicate course
  const handleDuplicate = async (courseId, courseName) => {
    const { value: newTitle } = await Swal.fire({
      title: "Duplicate Course",
      html: `<p class="mb-4">Create a copy of <strong>"${courseName}"</strong></p>`,
      input: "text",
      inputLabel: "New Course Title",
      inputValue: `${courseName} (Copy)`,
      inputPlaceholder: "Enter new course title",
      showCancelButton: true,
      confirmButtonColor: "#0EA5E9",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Duplicate",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter a course title";
        }
        if (value.length < 3) {
          return "Title must be at least 3 characters";
        }
      },
    });

    if (newTitle) {
      try {
        const token = await currentUser.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${courseId}/duplicate`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Duplicated!",
            text: "Course has been duplicated successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchCourses();
        } else {
          throw new Error(data.message || "Failed to duplicate course");
        }
      } catch (err) {
        console.error("Duplicate error:", err);
        Swal.fire({
          icon: "error",
          title: "Duplication Failed",
          text: err.message || "Failed to duplicate course",
          confirmButtonColor: "#0EA5E9",
        });
      }
    }
  };

  // Handle toggle course status
  const handleToggleStatus = async (courseId, currentStatus, courseName) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    const result = await Swal.fire({
      title: `${newStatus === "published" ? "Publish" : "Unpublish"} Course?`,
      text: `Change "${courseName}" status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA5E9",
      cancelButtonColor: "#64748B",
      confirmButtonText: `Yes, ${newStatus}!`,
    });

    if (result.isConfirmed) {
      try {
        const token = await currentUser.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/courses/${courseId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `Course ${newStatus} successfully`,
            timer: 2000,
            showConfirmButton: false,
          });
          fetchCourses();
        } else {
          throw new Error(data.message || "Failed to update course status");
        }
      } catch (err) {
        console.error("Status update error:", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message || "Failed to update course status",
          confirmButtonColor: "#0EA5E9",
        });
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-sky-500 mx-auto mb-4 animate-spin" />
          <p className="text-slate-600 text-lg font-medium">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              My Courses
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage and track all your courses
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchCourses}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <Link
              href="/dashboard/addCourse"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Create Course</span>
              <span className="sm:hidden">Create</span>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl border-2 border-blue-100 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stats.totalCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-green-100 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Published</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stats.publishedCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-purple-100 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Students</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stats.totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-amber-100 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-rose-100 p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Rating</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none w-full lg:w-56 font-medium cursor-pointer text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none w-full lg:w-48 font-medium cursor-pointer text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 lg:flex-none px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid3x3 className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 lg:flex-none px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCourses.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-semibold text-slate-700 bg-sky-100 px-3 sm:px-4 py-2 rounded-full">
                  {selectedCourses.length} selected
                </span>
                <button
                  onClick={() => handleBulkStatusUpdate("published")}
                  className="px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium shadow-md transition-all text-xs sm:text-sm"
                >
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Publish
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate("draft")}
                  className="px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium shadow-md transition-all text-xs sm:text-sm"
                >
                  <Archive className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Archive
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-md transition-all text-xs sm:text-sm"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedCourses([])}
                  className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all text-xs sm:text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Courses Display */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-8 sm:p-12 text-center">
            <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
              {courses.length === 0 ? "No courses yet" : "No courses found"}
            </h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base">
              {courses.length === 0
                ? "Get started by creating your first course"
                : "Try adjusting your filters"}
            </p>
            {courses.length === 0 && (
              <Link
                href="/dashboard/addCourse"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                <Plus className="h-5 w-5" />
                Create Your First Course
              </Link>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View - Keeping the existing grid code */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className={`bg-white rounded-2xl border-2 shadow-lg hover:shadow-2xl transition-all overflow-hidden group ${
                  selectedCourses.includes(course._id)
                    ? "border-sky-500 ring-4 ring-sky-200"
                    : "border-gray-200"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative h-44 sm:h-48 bg-slate-200">
                  <img
                    src={course.image || "/placeholder-course.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-course.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/course/${course._id}`}
                      className="px-3 sm:px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-lg font-medium shadow-lg transition-all text-sm"
                    >
                      <Eye className="h-4 w-4 inline mr-1 sm:mr-2" />
                      View
                    </Link>
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="px-3 sm:px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium shadow-lg transition-all text-sm"
                    >
                      <Edit className="h-4 w-4 inline mr-1 sm:mr-2" />
                      Edit
                    </button>
                  </div>

                  {/* Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course._id)}
                      onChange={() => toggleCourseSelection(course._id)}
                      className="w-5 h-5 rounded border-2 border-white shadow-lg cursor-pointer"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() =>
                        handleToggleStatus(
                          course._id,
                          course.status,
                          course.title
                        )
                      }
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg cursor-pointer transition-all hover:scale-105 ${
                        course.status === "published"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-amber-500 text-white hover:bg-amber-600"
                      }`}
                    >
                      {course.status}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-base sm:text-lg text-slate-800 line-clamp-2 flex-1">
                      {course.title}
                    </h3>
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-xl bg-white rounded-2xl w-48 sm:w-52 border-2 border-gray-100 z-10"
                      >
                        <li>
                          <Link
                            href={`/course/${course._id}`}
                            className="hover:bg-sky-50"
                          >
                            <Eye className="h-4 w-4" />
                            View Course
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => handleEdit(course._id)}
                            className="hover:bg-sky-50"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleDuplicate(course._id, course.title)
                            }
                            className="hover:bg-sky-50"
                          >
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                course._id,
                                course.status,
                                course.title
                              )
                            }
                            className="hover:bg-sky-50"
                          >
                            <Archive className="h-4 w-4" />
                            {course.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                          </button>
                        </li>
                        <li className="border-t border-slate-200 mt-2 pt-2">
                          <button
                            onClick={() =>
                              handleDelete(course._id, course.title)
                            }
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-semibold">
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {course.lessons || 0} lessons
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{course.students || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="truncate">{course.duration}</span>
                    </div>
                    {course.status === "published" && (
                      <>
                        <div className="flex items-center gap-2 text-amber-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span>
                            {course.rating > 0
                              ? course.rating.toFixed(1)
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span className="truncate">
                            $
                            {(
                              (course.students || 0) * (course.price || 0)
                            ).toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <span className="text-xl sm:text-2xl font-bold text-sky-500">
                      ${course.price}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="flex-1 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-all text-sm"
                    >
                      <Edit className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id, course.title)}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all text-sm"
                    >
                      <Trash2 className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View - Keeping existing list code */
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sky-50 border-b-2 border-gray-100">
                  <tr>
                    <th className="p-3 sm:p-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedCourses.length === filteredCourses.length &&
                          filteredCourses.length > 0
                        }
                        onChange={selectAllCourses}
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 text-sm sm:text-base">
                      Course
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 hidden sm:table-cell text-sm sm:text-base">
                      Category
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 hidden md:table-cell text-sm sm:text-base">
                      Status
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 hidden lg:table-cell text-sm sm:text-base">
                      Students
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 hidden lg:table-cell text-sm sm:text-base">
                      Rating
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 text-sm sm:text-base">
                      Price
                    </th>
                    <th className="p-3 sm:p-4 text-left font-semibold text-slate-700 text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="p-3 sm:p-4">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course._id)}
                          onChange={() => toggleCourseSelection(course._id)}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={course.image || "/placeholder-course.jpg"}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder-course.jpg";
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-800 truncate text-sm sm:text-base">
                              {course.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {course.lessons || 0} lessons • {course.duration}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 hidden sm:table-cell">
                        <span className="px-2 sm:px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-semibold whitespace-nowrap">
                          {course.category}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 hidden md:table-cell">
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              course._id,
                              course.status,
                              course.title
                            )
                          }
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all hover:scale-105 ${
                            course.status === "published"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }`}
                        >
                          {course.status}
                        </button>
                      </td>
                      <td className="p-3 sm:p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          {course.students || 0}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 hidden lg:table-cell">
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="font-medium">
                              {course.rating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="font-semibold text-sky-500 whitespace-nowrap text-sm sm:text-base">
                          ${course.price}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Link
                            href={`/course/${course._id}`}
                            className="p-2 hover:bg-sky-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4 text-sky-500" />
                          </Link>
                          <button
                            onClick={() => handleEdit(course._id)}
                            className="p-2 hover:bg-sky-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-sky-500" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(course._id, course.title)
                            }
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Course Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-sky-500 to-purple-500 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold">Edit Course</h2>
                <p className="text-sky-100 text-sm mt-1">
                  Update your course information
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image URL Section */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Course Image URL
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      name="imageUrl"
                      value={editFormData.imageUrl}
                      onChange={handleEditInputChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all ${
                        editFormErrors.imageUrl
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-sky-500"
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {editFormErrors.imageUrl && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.imageUrl}
                    </p>
                  )}
                  {editFormData.imageUrl &&
                    isValidUrl(editFormData.imageUrl) && (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                          src={editFormData.imageUrl}
                          alt="Course preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder-course.jpg";
                          }}
                        />
                      </div>
                    )}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all ${
                      editFormErrors.title
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-sky-500"
                    }`}
                    placeholder="Enter course title"
                  />
                  {editFormErrors.title && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all resize-none ${
                      editFormErrors.description
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-sky-500"
                    }`}
                    placeholder="Enter course description"
                  />
                  {editFormErrors.description && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.description}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all cursor-pointer ${
                      editFormErrors.category
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-sky-500"
                    }`}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {editFormErrors.category && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.category}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditInputChange}
                      min="0"
                      step="0.01"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all ${
                        editFormErrors.price
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-sky-500"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {editFormErrors.price && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.price}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Duration *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditInputChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all ${
                        editFormErrors.duration
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-sky-500"
                      }`}
                      placeholder="e.g., 4 weeks, 10 hours"
                    />
                  </div>
                  {editFormErrors.duration && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.duration}
                    </p>
                  )}
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={editFormData.level}
                    onChange={handleEditInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-sky-100 outline-none transition-all cursor-pointer ${
                      editFormErrors.level
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-sky-500"
                    }`}
                  >
                    <option value="">Select level</option>
                    {levelOptions.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {editFormErrors.level && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {editFormErrors.level}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl border-t-2 border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-linear-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
