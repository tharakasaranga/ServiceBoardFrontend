"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Header from "@/components/Header";
import api from "@/services/api";

export default function NewJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!formData.contactEmail.includes("@")) {
      toast.error("Enter a valid email");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/jobs", formData);

      toast.success("Job created successfully");

      router.push("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="container-wrapper py-14">
        <div className="glass-card rounded-[32px] p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-2">
            Post New Job Request
          </h1>

          <p className="text-gray-500 mb-8">
            Fill out the details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Need a plumber for kitchen sink"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the issue in detail..."
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Joinery">Joinery</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Glasgow"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Contact Name
                </label>

                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Contact Email
                </label>

                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}