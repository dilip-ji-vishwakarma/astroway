import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { apiServices } from "@/lib/api.services";
import { reviews } from "@/lib/api-endpoints";
import { Loader } from "@/components/ui-kit/Loader";

const Reviews = async () => {
  const response = await apiServices(reviews, "get");
  return (
    <Suspense fallback={<Loader />}>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Reviews;