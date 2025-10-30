import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { Loader } from "@/components/ui-kit/Loader";
import { BaseHeader } from "./toolkit/base-header";
import { apiServices } from "@/lib/api.services";
import { role } from "@/lib/api-endpoints";

const TeamRole = async() => {
    const response = await apiServices(role, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase response={response.data} />
    </Suspense>
  );
};

export default TeamRole;
