import { Loader } from "@/components/ui-kit/Loader";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Commission Rate for Calls/Chats",
};

const CommissionRate = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase />
    </Suspense>
  );
};

export default CommissionRate;
