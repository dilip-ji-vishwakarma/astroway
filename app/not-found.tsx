"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-600">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700"
      >
        Go Dashboard
      </Link>
    </div>
  );
}
