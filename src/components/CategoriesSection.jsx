import Link from "next/link";
import React from "react";
// Categories
const categories = [
  {
    name: "Web Development",
    icon: "💻",
    courses: 1250,
    color: "bg-sky-100 text-sky-600",
  },
  {
    name: "Data Science",
    icon: "📊",
    courses: 890,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Design",
    icon: "🎨",
    courses: 650,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Business",
    icon: "💼",
    courses: 780,
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Marketing",
    icon: "📱",
    courses: 540,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Photography",
    icon: "📸",
    courses: 320,
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Music",
    icon: "🎵",
    courses: 420,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Fitness",
    icon: "💪",
    courses: 280,
    color: "bg-orange-100 text-orange-600",
  },
];
export default function CategoriesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Explore Top Categories
          </h2>
          <p className="text-slate-600 text-lg">
            Discover courses in the most popular categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/courses?category=${category.name}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 border border-slate-200"
            >
              <div
                className={`text-4xl mb-3 w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto`}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600">
                {category.courses} courses
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
