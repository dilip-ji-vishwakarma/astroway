import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { Category } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { BaseHeader } from "./toolkit/base-header";

const page = async () => {
  const response = await apiServices(Category, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default page;