import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeaturedCoursesSection() {
  const { currentUser } = useAuth();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

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

        const course = await res.json();

        if (course.success) {
          // Get first 6 courses for featured section
          setFeaturedCourses(course.data.slice(0, 6));
        } else {
          throw new Error(course.message || "Failed to load courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEnrollClick = async (e, course) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      // Redirect to login if not authenticated
      router.push(`/login?redirect=/course/${course._id}`);
      return;
    }

    try {
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
        alert("Successfully enrolled in the course!");
        router.push(`/course/${course._id}`);
      } else {
        if (response.status === 400) {
          // Already enrolled, just navigate
          router.push(`/course/${course._id}`);
        } else {
          alert(data.message || "Failed to enroll");
        }
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Failed to enroll in course");
    }
  };

  const handleCourseClick = (courseId) => {
    router.push(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg font-medium">
                Loading featured courses...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
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
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Failed to Load Courses
              </h3>
              <p className="text-slate-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCourses.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg
                className="h-16 w-16 text-slate-400 mx-auto mb-4"
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
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No Courses Available
              </h3>
              <p className="text-slate-600">
                Check back later for new courses!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              Featured Courses
            </h2>
            <p className="text-slate-600 text-lg">
              Hand-picked courses by our expert instructors
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden sm:inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 px-6 py-2 rounded-lg font-medium transition-colors hover:shadow-md"
          >
            View All Courses
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCourses.map((course) => (
            <div
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority={false}
                />
                {course.bestseller && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      🏆 BESTSELLER
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center shadow-lg">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-semibold">
                    {course.category}
                  </span>
                  <span className="text-xs border border-slate-300 text-slate-700 px-3 py-1 rounded-full font-medium capitalize">
                    {course.level}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors min-h-[56px]">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-semibold text-sm">
                    {course.instructor?.charAt(0) || "I"}
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {course.instructor}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4 text-amber-500 fill-amber-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-slate-700">
                      {course.rating > 0 ? course.rating.toFixed(1) : "New"}
                    </span>
                    <span className="text-slate-500">
                      ({course.reviews || 0})
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
                    <span>{(course.students || 0).toLocaleString()}</span>
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
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-sky-600">
                      ${course.price}
                    </span>
                    {course.originalPrice &&
                      course.originalPrice > course.price && (
                        <>
                          <span className="text-sm text-slate-400 line-through">
                            ${course.originalPrice}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">
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
                  <button
                    onClick={(e) => handleEnrollClick(e, course)}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow-md"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center hover:shadow-md"
          >
            View All Courses
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
