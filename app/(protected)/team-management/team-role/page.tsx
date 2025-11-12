import type { Metadata } from "next";
import Permission from "./permission";
import { apiServices } from "@/lib/api.services";
import { role } from "@/lib/api-endpoints";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";

export const metadata: Metadata = {
  title: "Team Role",
};

export default async function Page() {
  const response = await apiServices(role, "get");
  return (<Suspense fallback={<Loader />}><Permission response={response.data}/></Suspense>);
}
