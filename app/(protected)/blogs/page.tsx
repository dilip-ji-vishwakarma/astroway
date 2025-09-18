import { Loader } from "@/components/ui-kit/Loader";
import { blogs } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Blog",
};

const Blogs = async () => {
  const response = await apiServices(blogs, "get");
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

export default Blogs;