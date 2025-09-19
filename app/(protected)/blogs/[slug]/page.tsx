/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@/components/ui-kit/Loader";
import { blog_details } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

type SlugProps = {
  params: any;
};

const Slug = async ({ params }: SlugProps) => {
  const { slug } = await params;
  const response = await apiServices(`${blog_details}/${slug}`, "get");
  return (
    <Suspense fallback={<Loader />}>
      <PageBase initialData={response.data} />
    </Suspense>
  );
};

export default Slug