import { Loader } from "@/components/ui-kit/Loader";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { apiServices } from "@/lib/api.services";
import { news } from "@/lib/api-endpoints";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "News",
};


const News = async () => {
  const response = await apiServices(news, "get");
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

export default News;