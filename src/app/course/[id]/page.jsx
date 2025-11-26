"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Page({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { currentUser } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course details
  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/course/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setCourse(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Check enrollment status
  useEffect(() => {
    if (!id || !currentUser) return;

    const checkEnrollment = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/check-enrollment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          setIsEnrolled(data.isEnrolled);
        }
      } catch (err) {
        console.error("Error checking enrollment:", err);
      }
    };

    checkEnrollment();
  }, [id, currentUser]);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!currentUser) {
      router.push(`/login?redirect=/course/${id}`);
      return;
    }

    try {
      setEnrolling(true);
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: course._id,
            courseName: course.title,
            coursePrice: course.price,
            courseImage: course.image,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsEnrolled(true);
        alert("Successfully enrolled in the course!");
        // Optionally redirect to learning page
        // router.push(`/learn/${course._id}`);
      } else {
        alert(data.message || "Failed to enroll");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Failed to enroll in course");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
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
            Course Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            {error || "This course doesn't exist"}
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors"
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
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Courses
                </Link>
                <span>/</span>
                <span className="text-white">{course.category}</span>
              </nav>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 px-3 py-1 rounded-full mb-4">
                <span className="text-sky-400 text-sm font-medium">
                  {course.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 mb-6">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">
                    {course.rating > 0 ? course.rating.toFixed(1) : "New"}
                  </span>
                  <span className="text-slate-400">
                    ({course.reviews || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-sky-400"
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
                  <span>{course.students || 0} students enrolled</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                  {course.instructor?.charAt(0) || "I"}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Instructor</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Content - Course Image */}
            <div className="relative">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  //   fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  //   priority
                />
              </div>
              {course.bestseller && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                  🏆 Bestseller
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                What You&apos;ll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Master the fundamentals",
                  "Build real-world projects",
                  "Industry best practices",
                  "Expert guidance",
                  "Hands-on experience",
                  "Certificate of completion",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Course Content
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                  <span>{course.lessons || 0} lessons</span>
                  <span>{course.duration}</span>
                </div>
                {/* Sample modules */}
                {[1, 2, 3, 4].map((module) => (
                  <details
                    key={module}
                    className="group border border-slate-200 rounded-lg"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 text-slate-400 group-open:rotate-90 transition-transform"
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
                        <span className="font-semibold text-slate-800">
                          Module {module}: Introduction
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">5 lessons</span>
                    </summary>
                    <div className="px-4 pb-4 space-y-2">
                      {[1, 2, 3, 4, 5].map((lesson) => (
                        <div
                          key={lesson}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg"
                        >
                          <svg
                            className="h-5 w-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-slate-700">
                            Lesson {lesson}: Topic Name
                          </span>
                          <span className="ml-auto text-sm text-slate-500">
                            10:30
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-slate-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Basic computer knowledge required
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-slate-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-slate-700">
                    No prior experience needed - {course.level} friendly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 text-slate-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-slate-700">
                    Passion to learn and grow
                  </span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Description
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed">
                  {course.description}
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  This comprehensive course is designed to take you from{" "}
                  {course.level} to advanced level. You&apos;ll learn through
                  practical examples and real-world projects that will prepare
                  you for professional work in this field.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-slate-800">
                    ${course.price}
                  </span>
                  {course.originalPrice &&
                    course.originalPrice > course.price && (
                      <>
                        <span className="text-xl text-slate-400 line-through">
                          ${course.originalPrice}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                          {Math.round(
                            ((course.originalPrice - course.price) /
                              course.originalPrice) *
                              100
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                </div>
                <p className="text-sm text-slate-500">One-time payment</p>
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnroll}
                disabled={enrolling || isEnrolled}
                className={`w-full py-4 rounded-lg font-semibold text-lg mb-4 transition-colors ${
                  isEnrolled
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : enrolling
                    ? "bg-slate-400 text-white cursor-not-allowed"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                {enrolling ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enrolling...
                  </span>
                ) : isEnrolled ? (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Already Enrolled
                  </span>
                ) : (
                  "Enroll Now"
                )}
              </button>

              {/* Course Includes */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-slate-800 mb-3">
                  This course includes:
                </h3>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{course.duration} of content</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{course.lessons || 0} video lessons</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Lifetime access</span>
                </div>
              </div>

              {/* Share */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-3">
                  Share this course:
                </h3>
                <div className="flex gap-3">
                  <button
                    aria-label="Share on Facebook"
                    className="flex-1 p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <svg
                      className="h-6 w-6 mx-auto text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Share on Twitter"
                    className="flex-1 p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <svg
                      className="h-6 w-6 mx-auto text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Share on LinkedIn"
                    className="flex-1 p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <svg
                      className="h-6 w-6 mx-auto text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
