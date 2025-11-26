import React from "react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-linear-to-r from-sky-600 to-sky-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">50K+</div>
            <div className="text-sky-100">Active Students</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">200+</div>
            <div className="text-sky-100">Quality Courses</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">150+</div>
            <div className="text-sky-100">Expert Instructors</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">95%</div>
            <div className="text-sky-100">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
