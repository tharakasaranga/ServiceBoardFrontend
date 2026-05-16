"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import JobCard from "@/components/JobCard";

import api from "@/services/api";

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

      <main>
        <section className="container-wrapper pt-14 pb-10">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-[32px] p-10 md:p-14 text-white">
            <div className="max-w-3xl">
              <p className="uppercase tracking-widest text-sm text-gray-300 mb-4">
                Mini Service Marketplace
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Find and manage home service requests easily
              </h1>

              <p className="text-gray-300 text-lg leading-8">
                Browse homeowner requests, manage job progress,
                and track open work opportunities in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wrapper pb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="page-title">
                Recent Job Requests
              </h2>

              <p className="page-subtitle">
                Explore available homeowner requests
              </p>
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-5 py-3 min-w-[220px]"
            >
              <option value="">All Categories</option>

              <option value="Plumbing">
                Plumbing
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Painting">
                Painting
              </option>

              <option value="Joinery">
                Joinery
              </option>
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}