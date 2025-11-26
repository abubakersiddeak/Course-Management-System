import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/course/${course._id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {course.bestseller && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
              Bestseller
            </div>
          )}
          <div className="absolute top-3 left-3 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {course.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-slate-600 mb-3">By {course.instructor}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-slate-700">
                {course.rating > 0 ? course.rating.toFixed(1) : "New"}
              </span>
              <span className="text-slate-500">({course.reviews || 0})</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
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
              <span>{course.students || 0}</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="capitalize">{course.level}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800">
                ${course.price}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-sm text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-sky-600 font-semibold group-hover:translate-x-1 transition-transform">
              View Course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
