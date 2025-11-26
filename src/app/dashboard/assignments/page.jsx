"use client";

import Link from "next/link";
import {
  Construction,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function UnderConstructionPage() {
  const timeline = [
    { phase: "Planning", status: "completed" },
    { phase: "Design", status: "completed" },
    { phase: "Development", status: "in-progress" },
    { phase: "Testing", status: "upcoming" },
    { phase: "Launch", status: "upcoming" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-sky-600 to-sky-700 p-8 text-center text-white">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Construction className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Under Construction</h1>
          <p className="text-sky-100">
            This feature is currently being built with care
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* What's Coming */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Whats Coming
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">
                    Advanced analytics dashboard
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">
                    Real-time notifications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">
                    Export and reporting tools
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600">
                    Enhanced user experience
                  </span>
                </li>
              </ul>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Development Timeline
              </h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : item.status === "in-progress" ? (
                      <div className="relative shrink-0">
                        <Circle className="h-5 w-5 text-sky-600" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-sky-600 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 shrink-0" />
                    )}
                    <span
                      className={`${
                        item.status === "completed"
                          ? "text-green-600 font-medium"
                          : item.status === "in-progress"
                          ? "text-sky-600 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {item.phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Estimated Launch */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 text-center">
            <Clock className="h-8 w-8 text-sky-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-1">
              Estimated Launch
            </h3>
            <p className="text-2xl font-bold text-sky-600 mb-2">
              Coming in Q1 2025
            </p>
            <p className="text-sm text-slate-600">
              Want to be notified when this feature launches?
            </p>
            <button className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none mt-4">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
