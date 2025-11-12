import type { Metadata } from "next";
import Permission from "./permission";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";
import { apiServices } from "@/lib/api.services";
import { manage_astrologer } from "@/lib/api-endpoints";

export const metadata: Metadata = {
  title: "Manage Astrologers",
};

export default async function Page() {
  const response = await apiServices(manage_astrologer, "get");
  return (
    <Suspense fallback={<Loader />}>
      <Permission response={response.data} />
    </Suspense>
  );
}

