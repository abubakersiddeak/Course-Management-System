"use client";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturesSection from "@/components/FeaturesSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CtaSection from "@/components/CtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroCarousel />
      {/* Features Section */}
      <FeaturesSection />
      {/* Categories Section */}
      <CategoriesSection />
      {/* Featured Courses */}
      <FeaturedCoursesSection />
      {/* Stats Section */}
      <StatsSection />
      {/* Testimonials Carousel */}
      <TestimonialsCarousel />
      {/* CTA Section */}
      <CtaSection />
    </div>
  );
}
