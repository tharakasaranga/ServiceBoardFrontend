"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Header from "@/components/Header";
import Loader from "@/components/Loader";

import api from "@/services/api";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${params.id}`);

      setJob(data);
    } catch (error) {
      toast.error("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const updateStatus = async (status) => {
    try {
      const { data } = await api.patch(`/jobs/${params.id}`, {
        status,
      });

      setJob(data);

      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteJob = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/jobs/${params.id}`);

      toast.success("Job deleted");

      router.push("/");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <>
        <Header />

        <div className="text-center py-20">
          Job not found
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="container-wrapper py-14">
        <div className="glass-card rounded-[32px] p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                {job.title}
              </h1>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {job.category}
                </span>

                <span className="text-gray-500">
                  {job.location}
                </span>
              </div>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm ${
                job.status === "Open"
                  ? "bg-green-100 text-green-700"
                  : job.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {job.status}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-8 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Contact Name
              </h3>

              <p>{job.contactName || "N/A"}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Contact Email
              </h3>

              <p>{job.contactEmail || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={job.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="border rounded-lg px-4 py-3"
            >
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Closed">Closed</option>
            </select>

            <button
              onClick={deleteJob}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 hover:scale-[1.01] transition"
            >
              Delete Job
            </button>
          </div>
        </div>
      </main>
    </>
  );
}