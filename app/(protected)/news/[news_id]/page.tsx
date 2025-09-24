/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Loader } from "@/components/ui-kit/Loader";
import { news } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Update News",
};

export type PageProps = {
  params: any;
};

const NewsId = async ({ params }: PageProps) => {
  const { news_id } = await params;
  const response = await apiServices(`${news}/${news_id}`, "get");
  return (
    <Suspense fallback={<Loader />}>
      <PageBase response={response} />
    </Suspense>
  );
};

export default NewsId;