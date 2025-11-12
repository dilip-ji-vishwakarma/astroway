import type { Metadata } from "next";
import Permission from "./permission";
import { apiServices } from "@/lib/api.services";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";
import { dashboard } from "@/lib/api-endpoints";

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Page() {
  const response = await apiServices(dashboard, "get");
  return (
    <Suspense fallback={<Loader />}>
      <Permission response={response.data} />
    </Suspense>
  );
}

