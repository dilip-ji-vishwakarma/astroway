import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { apiServices } from "@/lib/api.services";
import { manage_astrologer } from "@/lib/api-endpoints";
import { Metadata } from "next";
import { BaseHeader } from "./toolkit/base-header";

export const metadata: Metadata = {
  title: 'Manage Astrologers',
}

const AstrologerList = async () => {
  const response = await apiServices(manage_astrologer, "get");

  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader response={response.data}/>
      <PageBase/>
    </Suspense>
  );
};

export default AstrologerList;
