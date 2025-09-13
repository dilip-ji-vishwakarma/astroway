/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@/components/ui-kit/Loader";
import { astrologer_details } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Update Astrologer",
};

export type PageProps = {
  params: any;
};

const AstrologerId = async ({ params }: PageProps) => {
  const { astrologer_id } = await params;
  const response = await apiServices(
    `${astrologer_details}/${astrologer_id}`,
    "get"
  );
  return (
    <Suspense fallback={<Loader />}>
        <PageBase response={response} id={astrologer_id}/>
    </Suspense>
  );
};

export default AstrologerId;
