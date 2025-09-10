import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { apiServices } from "@/lib/api.services";
import { reviews } from "@/lib/api-endpoints";
import { Loader } from "@/components/ui-kit/Loader";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reviews',
}

const Reviews = async () => {
  const response = await apiServices(reviews, "get");
  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Reviews</TextH1>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Reviews;