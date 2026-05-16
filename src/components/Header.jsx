"use client";

import Link from "next/link";
import { Hammer, BriefcaseBusiness } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container-wrapper h-18 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center">
            <Hammer size={20} />
          </div>

          <div>
            <h2 className="font-bold text-lg leading-none">
              Service Board
            </h2>

            <p className="text-sm text-gray-500">
              Home Service Requests
            </p>
          </div>
        </Link>

        <Link
          href="/jobs/new"
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:scale-[1.02] transition"
        >
          <BriefcaseBusiness size={18} />
          Post Request
        </Link>
      </div>
    </header>
  );
}