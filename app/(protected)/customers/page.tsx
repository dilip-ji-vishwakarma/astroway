import type { Metadata } from "next";
import Permission from "./permission";
import { apiServices } from "@/lib/api.services";
import { admin_users } from "@/lib/api-endpoints";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page() {
  const response = await apiServices(admin_users, "get");
  return (
    <Suspense fallback={<Loader />}>
      <Permission response={response.data} />
    </Suspense>
  );
}
