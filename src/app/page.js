"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import JobCard from "@/components/JobCard";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);

      let url = "/jobs";

      if (category) {
        url += `?category=${category}`;
      }

      const { data } = await api.get(url);

      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Service Requests
            </h1>

            <p className="text-gray-500">
              Browse open homeowner requests
            </p>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border bg-white rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}