import Image from "next/image";
import React, { useEffect, useState } from "react";
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
export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return (
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
                    quality={100}
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
  );
}
