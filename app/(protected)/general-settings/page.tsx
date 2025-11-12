import type { Metadata } from "next";
import Permission from "./permission";
import { apiServices } from "@/lib/api.services";
import { settings } from "@/lib/api-endpoints";
import { Loader } from "@/components/ui-kit/Loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "General Settings",
};

export default async function Page() {
  const response = await apiServices(settings, "get")
  return (
    <Suspense fallback={<Loader />}>
      <Permission response={response.data}/>
    </Suspense>
  );
}