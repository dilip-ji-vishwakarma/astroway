import { Loader } from "@/components/ui-kit/Loader";
import { stories } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

export const metadata: Metadata = {
  title: "Stories",
};

const Stories = async () => {
  const response = await apiServices(stories, "get");

  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Stories</TextH1>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Stories;
