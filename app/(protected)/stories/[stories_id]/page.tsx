/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@/components/ui-kit/Loader";
import { stories } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

type SlugProps = {
  params: any;
};

const StroriesId = async ({ params }: SlugProps) => {
  const { stories_id } = await params;
  const response = await apiServices(`${stories}/${stories_id}`, "get");
  return (
    <Suspense fallback={<Loader />}>
      <PageBase initialData={response.data} />
    </Suspense>
  );
};

export default StroriesId