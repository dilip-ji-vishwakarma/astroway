import { banner } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Banner Management",
};

const BannerManagement = async () => {
  const response = await apiServices(banner, "get");
  return (
    <Suspense>
      <BaseHeader />
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default BannerManagement;