import type { Metadata } from "next";
import Permission from "./permission";
import { apiServices } from "@/lib/api.services";
import { pages } from "@/lib/api-endpoints";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";

export const metadata: Metadata = {
  title: "Page Management",
};

export default async function Page() {
  const response = await apiServices(pages, "get");
  return (
    <Suspense fallback={<Loader />}>
      <Permission response={response.data} />
    </Suspense>
  );
}
