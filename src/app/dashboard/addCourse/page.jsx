"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Loader2,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
    duration: "",
    thumbnail: null,
    syllabus: [{ week: 1, topic: "", description: "" }],
    prerequisites: [""],
    learningOutcomes: [""],
    status: "draft",
  });

  const [errors, setErrors] = useState({});

  // Categories
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Other",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          thumbnail: "Image size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, thumbnail: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    setImagePreview(null);
  };

  // Handle syllabus changes
  const handleSyllabusChange = (index, field, value) => {
    const updatedSyllabus = [...formData.syllabus];
    updatedSyllabus[index][field] = value;
    setFormData((prev) => ({ ...prev, syllabus: updatedSyllabus }));
  };

  const addSyllabusWeek = () => {
    setFormData((prev) => ({
      ...prev,
      syllabus: [
        ...prev.syllabus,
        { week: prev.syllabus.length + 1, topic: "", description: "" },
      ],
    }));
  };

  const removeSyllabusWeek = (index) => {
    if (formData.syllabus.length > 1) {
      const updatedSyllabus = formData.syllabus.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, syllabus: updatedSyllabus }));
    }
  };

  // Handle prerequisites changes
  const handlePrerequisiteChange = (index, value) => {
    const updated = [...formData.prerequisites];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, prerequisites: updated }));
  };

  const addPrerequisite = () => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: [...prev.prerequisites, ""],
    }));
  };

  const removePrerequisite = (index) => {
    if (formData.prerequisites.length > 1) {
      const updated = formData.prerequisites.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, prerequisites: updated }));
    }
  };

  // Handle learning outcomes changes
  const handleOutcomeChange = (index, value) => {
    const updated = [...formData.learningOutcomes];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
  };

  const addOutcome = () => {
    setFormData((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, ""],
    }));
  };

  const removeOutcome = (index) => {
    if (formData.learningOutcomes.length > 1) {
      const updated = formData.learningOutcomes.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Course description is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Course duration is required";
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "Course thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();

    if (!validateForm() && !isDraft) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      const courseData = {
        ...formData,
        status: isDraft ? "draft" : "published",
        instructorId: currentUser?.uid,
        instructorName: currentUser?.displayName || currentUser?.email,
        createdAt: new Date().toISOString(),
      };

      console.log("Course Data:", courseData);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(courseData),
      // });

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message (you can use toast here)
      alert(
        isDraft
          ? "Course saved as draft successfully!"
          : "Course published successfully!"
      );

      // Redirect to courses page
      router.push("/dashboard/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-sky-600" />
              </div>
              Create New Course
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Fill in the details to create a new course
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-sky-600 rounded-full"></div>
            Basic Information
          </h2>

          <div className="space-y-4">
            {/* Course Title */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Course Title <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Complete Web Development Bootcamp"
                className={`input input-bordered w-full ${
                  errors.title ? "input-error" : ""
                }`}
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title}
                  </span>
                </label>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Description <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your course in detail..."
                rows="5"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description}
                  </span>
                </label>
              )}
            </div>

            {/* Category and Level - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Category <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`select select-bordered w-full ${
                    errors.category ? "select-error" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.category}
                    </span>
                  </label>
                )}
              </div>

              {/* Level */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Level</span>
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Price and Duration - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Price (USD) <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  min="0"
                  step="0.01"
                  className={`input input-bordered w-full ${
                    errors.price ? "input-error" : ""
                  }`}
                />
                {errors.price && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.price}
                    </span>
                  </label>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Duration <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 8 weeks, 40 hours"
                  className={`input input-bordered w-full ${
                    errors.duration ? "input-error" : ""
                  }`}
                />
                {errors.duration && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.duration}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Course Thumbnail <span className="text-red-500">*</span>
                </span>
              </label>

              {!imagePreview ? (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-8 text-center hover:border-sky-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={imagePreview}
                    alt="Course thumbnail preview"
                    className="w-full h-48 sm:h-64 object-cover"
                    height={40}
                    width={40}
                    quality={100}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 btn btn-sm btn-circle bg-red-500 hover:bg-red-600 text-white border-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {errors.thumbnail && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.thumbnail}
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Course Syllabus */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-sky-600 rounded-full"></div>
              Course Syllabus
            </h2>
            <button
              type="button"
              onClick={addSyllabusWeek}
              className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
            >
              <Plus className="h-4 w-4" />
              Add Week
            </button>
          </div>

          <div className="space-y-4">
            {formData.syllabus.map((week, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-700">
                    Week {week.week}
                  </h3>
                  {formData.syllabus.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSyllabusWeek(index)}
                      className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={week.topic}
                    onChange={(e) =>
                      handleSyllabusChange(index, "topic", e.target.value)
                    }
                    placeholder="Week topic"
                    className="input input-bordered input-sm w-full"
                  />
                  <textarea
                    value={week.description}
                    onChange={(e) =>
                      handleSyllabusChange(index, "description", e.target.value)
                    }
                    placeholder="Week description"
                    rows="2"
                    className="textarea textarea-bordered textarea-sm w-full"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-sky-600 rounded-full"></div>
              Prerequisites
            </h2>
            <button
              type="button"
              onClick={addPrerequisite}
              className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.prerequisites.map((prereq, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={prereq}
                  onChange={(e) =>
                    handlePrerequisiteChange(index, e.target.value)
                  }
                  placeholder="e.g., Basic HTML and CSS knowledge"
                  className="input input-bordered input-sm flex-1"
                />
                {formData.prerequisites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePrerequisite(index)}
                    className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-sky-600 rounded-full"></div>
              Learning Outcomes
            </h2>
            <button
              type="button"
              onClick={addOutcome}
              className="btn btn-sm bg-sky-600 hover:bg-sky-700 text-white border-none"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  placeholder="e.g., Build responsive websites from scratch"
                  className="input input-bordered input-sm flex-1"
                />
                {formData.learningOutcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(index)}
                    className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              href="/dashboard/courses"
              className="btn btn-outline btn-sm sm:btn-md order-3 sm:order-1"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              className="btn btn-outline btn-sm sm:btn-md order-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-sky-600 hover:bg-sky-700 text-white border-none btn-sm sm:btn-md order-1 sm:order-3"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              Publish Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
