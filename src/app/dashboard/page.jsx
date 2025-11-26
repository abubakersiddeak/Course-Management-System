"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Calendar,
  Play,
  Plus,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 12,
    enrolledStudents: 248,
    completionRate: 78,
    activeCourses: 8,
  });

  const recentCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 45,
      progress: 65,
      status: "active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      students: 32,
      progress: 40,
      status: "active",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      title: "Database Design & SQL",
      students: 28,
      progress: 85,
      status: "active",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      students: 52,
      progress: 92,
      status: "completed",
      lastUpdated: "1 week ago",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Grade React Assignment",
      course: "Advanced React",
      due: "Today, 5:00 PM",
      priority: "high",
    },
    {
      id: 2,
      title: "Prepare Week 5 Materials",
      course: "Web Development",
      due: "Tomorrow",
      priority: "medium",
    },
    {
      id: 3,
      title: "Student Progress Review",
      course: "Database Design",
      due: "Dec 28",
      priority: "low",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "enrollment",
      message: "5 new students enrolled in Web Development",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "completion",
      message: "Sarah completed UI/UX Design Principles",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "submission",
      message: "12 new assignment submissions",
      time: "3 hours ago",
    },
    {
      id: 4,
      type: "comment",
      message: "New comment on React Course - Week 3",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-sky-600 to-sky-700 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              Welcome back,{" "}
              {currentUser?.displayName?.split(" ")[0] || "Instructor"}! 👋
            </h1>
            <p className="text-sky-100 text-sm sm:text-base">
              Heres whats happening with your courses today.
            </p>
          </div>
          <Link
            href="/dashboard/addCourse"
            className="btn bg-white hover:bg-slate-100 text-sky-700 border-none btn-sm sm:btn-md shrink-0 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Course</span>
            <span className="sm:hidden">New Course</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Courses */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full self-start sm:self-auto">
              +12%
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {stats.totalCourses}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Total Courses
          </p>
        </div>

        {/* Enrolled Students */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full self-start sm:self-auto">
              +8%
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {stats.enrolledStudents}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Students</p>
        </div>

        {/* Completion Rate */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full self-start sm:self-auto">
              +5%
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {stats.completionRate}%
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Completion</p>
        </div>

        {/* Active Courses */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-full self-start sm:self-auto">
              Live
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            {stats.activeCourses}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Active</p>
        </div>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Courses - Takes 2 columns on XL screens */}
        <div className="xl:col-span-2 bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              Recent Courses
            </h2>
            <Link
              href="/dashboard/courses"
              className="text-xs sm:text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-800 truncate">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        {course.lastUpdated}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium text-slate-800">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className={`h-1.5 sm:h-2 rounded-full transition-all ${
                            course.status === "completed"
                              ? "bg-green-500"
                              : "bg-sky-600"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto">
                    {course.status === "completed" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Completed</span>
                        <span className="sm:hidden">Done</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 bg-sky-50 px-2 sm:px-3 py-1 rounded-full">
                        <Play className="h-3 w-3" />
                        Active
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              Upcoming Tasks
            </h2>
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 text-xs sm:text-sm pr-2">
                      {task.title}
                    </h3>
                    <span
                      className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{task.course}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {task.due}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/assignments"
              className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none w-full mt-4"
            >
              View All Tasks
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">
            Recent Activity
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === "enrollment"
                      ? "bg-sky-100"
                      : activity.type === "completion"
                      ? "bg-green-100"
                      : activity.type === "submission"
                      ? "bg-purple-100"
                      : "bg-amber-100"
                  }`}
                >
                  {activity.type === "enrollment" ? (
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600" />
                  ) : activity.type === "completion" ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  ) : activity.type === "submission" ? (
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-slate-800">
                    {activity.message}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
