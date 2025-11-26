"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Hero Carousel Data
  const heroSlides = [
    {
      id: 1,
      title: "Transform Your Future with",
      highlight: "Expert-Led Courses",
      description:
        "Learn from industry professionals and master in-demand skills at your own pace",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      cta: "Explore Courses",
      stats: { students: "50K+", courses: "200+", rating: "4.9" },
    },
    {
      id: 2,
      title: "Master New Skills",
      highlight: "Anytime, Anywhere",
      description:
        "Access world-class education from the comfort of your home with our flexible learning platform",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      cta: "Start Learning",
      stats: { students: "50K+", courses: "200+", rating: "4.9" },
    },
    {
      id: 3,
      title: "Advance Your Career with",
      highlight: "Industry-Recognized Certificates",
      description:
        "Boost your professional profile with certificates that employers trust and value",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
      cta: "Get Certified",
      stats: { students: "50K+", courses: "200+", rating: "4.9" },
    },
  ];

  // Featured Courses
  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      rating: 4.8,
      students: 12453,
      price: 99.99,
      duration: "52 hours",
      level: "Beginner",
      bestseller: true,
    },
    {
      id: 2,
      title: "Advanced React & Next.js Development",
      instructor: "Maximilian Schwarzmüller",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
      rating: 4.9,
      students: 8234,
      price: 129.99,
      duration: "40 hours",
      level: "Advanced",
      bestseller: false,
    },
    {
      id: 3,
      title: "Python for Data Science & Machine Learning",
      instructor: "Jose Portilla",
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500",
      rating: 4.7,
      students: 15678,
      price: 149.99,
      duration: "60 hours",
      level: "Intermediate",
      bestseller: true,
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Daniel Walter Scott",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
      rating: 4.9,
      students: 9876,
      price: 119.99,
      duration: "45 hours",
      level: "All Levels",
      bestseller: false,
    },
    {
      id: 5,
      title: "Digital Marketing Complete Course",
      instructor: "Phil Ebiner",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      rating: 4.6,
      students: 11234,
      price: 89.99,
      duration: "35 hours",
      level: "Beginner",
      bestseller: false,
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      instructor: "Stephen Grider",
      category: "Mobile Development",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      rating: 4.8,
      students: 7654,
      price: 139.99,
      duration: "48 hours",
      level: "Intermediate",
      bestseller: true,
    },
  ];

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

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      company: "Google",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "This platform completely transformed my career. The courses are well-structured and the instructors are top-notch. I landed my dream job at Google within 6 months!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UX Designer",
      company: "Apple",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "The UI/UX courses here are exceptional. The practical projects helped me build a strong portfolio that got me hired at Apple. Highly recommended!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Microsoft",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Best investment I've made in my education. The data science program is comprehensive and the support from instructors is amazing. Now working at Microsoft!",
    },
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
        {/* Carousel Slides */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-full">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm border border-sky-400/30 px-4 py-2 rounded-full mb-6">
                      <svg
                        className="h-4 w-4 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                      <span className="text-sky-100 text-sm font-medium">
                        #1 Online Learning Platform
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                      {slide.title}
                      <br />
                      <span className="text-sky-400">{slide.highlight}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-slate-300 mb-8">
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-8">
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
                        <span className="text-white font-semibold">
                          {slide.stats.students} Students
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span className="text-white font-semibold">
                          {slide.stats.courses} Courses
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white font-semibold">
                          {slide.stats.rating} Rating
                        </span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        {slide.cta}
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
                        href="/about"
                        className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-medium transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute hidden lg:flex left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white  items-center justify-center transition-colors"
        >
          <svg
            className="h-6 w-6"
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
        </button>
        <button
          onClick={nextSlide}
          className="absolute hidden lg:flex right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white  items-center justify-center transition-colors"
        >
          <svg
            className="h-6 w-6"
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
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-sky-500 w-8"
                  : "bg-white/50 hover:bg-white/70 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-sky-600"
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
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Expert Instructors
              </h3>
              <p className="text-slate-600">
                Learn from industry professionals with years of real-world
                experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-purple-600"
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
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Lifetime Access
              </h3>
              <p className="text-slate-600">
                Access your courses anytime, anywhere with no time restrictions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Certified Learning
              </h3>
              <p className="text-slate-600">
                Earn certificates recognized by top companies worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Featured Courses */}
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
              className="hidden sm:inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 px-6 py-2 rounded-lg font-medium transition-colors"
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
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {course.bestseller && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        BESTSELLER
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center"
                    >
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
                    </Link>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs border border-slate-300 px-2 py-1 rounded">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-3">
                    {course.instructor}
                  </p>

                  <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-amber-500 fill-amber-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{course.rating}</span>
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
                      <span>{course.students.toLocaleString()}</span>
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

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <span className="text-2xl font-bold text-sky-600">
                      ${course.price}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="bg-sky-600 hover:bg-sky-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
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

      {/* Stats Section */}
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

      {/* Testimonials Carousel */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Success Stories
            </h2>
            <p className="text-slate-600 text-lg">
              Hear from our students who transformed their careers
            </p>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      height={20}
                      width={20}
                      className="w-20 h-20 rounded-full border-4 border-sky-100"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-slate-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-slate-600">{testimonial.role}</p>
                      <p className="text-sky-600 font-semibold">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4 justify-center sm:justify-start">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-amber-500 fill-amber-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-700 text-lg leading-relaxed text-center sm:text-left">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-sky-600 w-8"
                      : "bg-slate-300 hover:bg-slate-400 w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm border border-sky-400/30 px-4 py-2 rounded-full mb-6">
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
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="text-sky-100 text-sm font-medium">
              Start Your Journey Today
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform and take
            the first step towards your dream career
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
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
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Browse Courses
            </Link>
          </div>

          <p className="text-sm text-slate-400 mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
