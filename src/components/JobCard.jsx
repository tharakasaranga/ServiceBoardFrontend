"use client";

import Link from "next/link";

import {
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function JobCard({ job }) {
  const statusStyles = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Closed: "bg-red-100 text-red-700",
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="glass-card rounded-3xl p-6 h-full hover:-translate-y-1 transition duration-300">
        <div className="flex items-start justify-between mb-5">
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
            {job.category || "General"}
          </span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[job.status]}`}
          >
            {job.status}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-3 leading-snug">
          {job.title}
        </h2>

        <p className="text-gray-600 leading-7 mb-6 line-clamp-3">
          {job.description}
        </p>

        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location || "Unknown Location"}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 font-medium text-sm">
          View Details
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}