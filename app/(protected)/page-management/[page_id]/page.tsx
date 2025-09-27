/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Update Page",
};

export type PageProps = {
  params: any;
};

const PageId = async ({ params }: PageProps) => {
  const { page_id } = await params;
  const response = await apiServices(`/admin/pages/${page_id}`, "get");

  return (
    <Suspense fallback={<Loader />}>
      <PageBase data={response.data} />
    </Suspense>
  );
};

export default PageId;
