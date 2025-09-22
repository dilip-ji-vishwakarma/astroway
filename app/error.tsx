"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("App crashed:", error);
  }, [error]);

  return (
    <html>
      <body className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
        <h2 className="text-3xl font-bold text-red-600">Something went wrong!</h2>
        <p className="mt-2 text-gray-700">We’re working on fixing it.</p>

        <button
          onClick={() => reset()} // reloads/retries the rendering
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
