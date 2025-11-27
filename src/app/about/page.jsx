"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  // Team Members
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/300?img=1",
      bio: "15+ years in education technology",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Curriculum",
      image: "https://i.pravatar.cc/300?img=2",
      bio: "Former professor at Stanford University",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Chief Technology Officer",
      image: "https://i.pravatar.cc/300?img=3",
      bio: "Ex-Google engineer, AI specialist",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      name: "David Kim",
      role: "Head of Student Success",
      image: "https://i.pravatar.cc/300?img=4",
      bio: "Dedicated to learner outcomes",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Director of Marketing",
      image: "https://i.pravatar.cc/300?img=5",
      bio: "Growth strategist and brand expert",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Head of Partnerships",
      image: "https://i.pravatar.cc/300?img=6",
      bio: "Building educational ecosystems",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  // Stats
  const stats = [
    { label: "Active Students", value: "50,000+", icon: "users" },
    { label: "Expert Instructors", value: "150+", icon: "award" },
    { label: "Courses Available", value: "200+", icon: "book" },
    { label: "Countries Reached", value: "120+", icon: "globe" },
  ];

  // Values
  const values = [
    {
      title: "Quality Education",
      description:
        "We believe in providing world-class education accessible to everyone",
      icon: "star",
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving our platform with cutting-edge technology",
      icon: "lightbulb",
    },
    {
      title: "Community",
      description:
        "Building a supportive learning community that grows together",
      icon: "users",
    },
    {
      title: "Accessibility",
      description: "Making quality education affordable and available globally",
      icon: "globe",
    },
  ];

  // Timeline
  const timeline = [
    {
      year: "2019",
      title: "Foundation",
      description: "CMS was founded with a vision to democratize education",
    },
    {
      year: "2020",
      title: "First 10K Students",
      description: "Reached our first milestone of 10,000 active learners",
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with localized content",
    },
    {
      year: "2022",
      title: "Mobile App Launch",
      description: "Launched iOS and Android apps for learning on-the-go",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered personalized learning paths",
    },
    {
      year: "2024",
      title: "50K Students",
      description: "Celebrating 50,000 active students worldwide",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-sky-600 to-sky-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About Our Platform
            </h1>
            <p className="text-lg sm:text-xl text-sky-100 mb-8">
              We are on a mission to make quality education accessible to
              everyone, everywhere. Join thousands of learners transforming
              their careers through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Courses
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-700 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon === "users" && (
                    <svg
                      className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600"
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
                  )}
                  {stat.icon === "award" && (
                    <svg
                      className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600"
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
                  )}
                  {stat.icon === "book" && (
                    <svg
                      className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600"
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
                  )}
                  {stat.icon === "globe" && (
                    <svg
                      className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn more about what drives us and our vision for the future of
              education
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {[
              { id: "mission", label: "Mission" },
              { id: "vision", label: "Vision" },
              { id: "values", label: "Values" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-sky-600 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
            {activeTab === "mission" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  At CMS, our mission is to democratize education by making
                  high-quality learning accessible to everyone, regardless of
                  their location or background. We believe that education is the
                  key to unlocking human potential and creating opportunities
                  for personal and professional growth.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Through our platform, we connect passionate instructors with
                  eager learners, creating a vibrant community where knowledge
                  is shared, skills are developed, and dreams become reality. We
                  are committed to providing an engaging, effective, and
                  affordable learning experience that transforms lives.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  We envision a world where quality education is a universal
                  right, not a privilege. Our goal is to become the worlds
                  leading online learning platform, reaching millions of
                  learners across the globe and empowering them with the skills
                  they need to succeed in an ever-changing world.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  By 2030, we aim to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-sky-600 mt-0.5 flex-shrink-0"
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
                    <span className="text-slate-600">
                      Serve 10 million active learners worldwide
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-sky-600 mt-0.5 flex-shrink-0"
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
                    <span className="text-slate-600">
                      Offer courses in 50+ languages
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-sky-600 mt-0.5 flex-shrink-0"
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
                    <span className="text-slate-600">
                      Partner with 1000+ leading organizations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-sky-600 mt-0.5 flex-shrink-0"
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
                    <span className="text-slate-600">
                      Provide free education to underserved communities
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "values" && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Our Core Values
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="p-6 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                        {value.icon === "star" && (
                          <svg
                            className="h-6 w-6 text-sky-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        )}
                        {value.icon === "lightbulb" && (
                          <svg
                            className="h-6 w-6 text-sky-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        )}
                        {value.icon === "users" && (
                          <svg
                            className="h-6 w-6 text-sky-600"
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
                        )}
                        {value.icon === "globe" && (
                          <svg
                            className="h-6 w-6 text-sky-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-slate-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-slate-600">
              From a small startup to a global learning platform
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  } items-center gap-8`}
                >
                  {/* Content */}
                  <div className="w-full md:w-5/12 bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="text-2xl font-bold text-sky-600 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-600 rounded-full ring-4 ring-white"></div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Passionate educators and technologists dedicated to transforming
              online learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-slate-100 hover:bg-sky-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-slate-100 hover:bg-sky-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="h-5 w-5 text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-sky-600 to-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform and take
            the first step towards achieving your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors text-lg"
            >
              Get Started Free
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-700 px-8 py-3 rounded-lg font-medium transition-colors text-lg"
            >
              Browse Courses
            </Link>
          </div>
          <p className="text-sm text-sky-200 mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
