import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Banner Management",
};

const BannerManagement = async () => {
  return (
    <Suspense>
      <BaseHeader />
      <PageBase />
    </Suspense>
  );
};

export default BannerManagement;