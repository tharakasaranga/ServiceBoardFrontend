"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white border rounded-2xl p-5 hover:shadow-lg transition duration-200">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-lg font-semibold">
            {job.title}
          </h2>

          <span
            className={`text-sm px-3 py-1 rounded-full ${
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

        <p className="text-gray-600 mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
            {job.category}
          </span>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={16} />
            {job.location}
          </div>
        </div>
      </div>
    </Link>
  );
}