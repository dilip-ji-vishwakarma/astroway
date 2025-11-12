import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized Access",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-3xl font-semibold text-red-600">Access Denied</h1>
      <p className="mt-2 text-gray-600">
        You don’t have permission to access this page.
      </p>
    </div>
  );
}
