import Image from "next/image";
import Link from "next/link";

export default function EnrollmentCard({ enrollment, compact = false }) {
  if (compact) {
    return (
      <Link
        href={`/course/${enrollment.courseId}`}
        className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
          <Image
            src={enrollment.courseImage}
            alt={enrollment.courseName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 truncate">
            {enrollment.courseName}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className="bg-sky-600 h-2 rounded-full"
                style={{ width: `${enrollment.progress || 0}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-slate-600">
              {enrollment.progress || 0}%
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    // Full card version (same as in the main page)
    <div>...</div>
  );
}
