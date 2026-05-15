"use client";

import Link from "next/link";
import { Hammer } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
        >
          <Hammer size={22} />
          Service Board
        </Link>

        <Link
          href="/jobs/new"
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Post Job
        </Link>
      </div>
    </header>
  );
}