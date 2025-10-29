import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { BaseHeader } from "./toolkit/base-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories',
}

const page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase />
    </Suspense>
  );
};

export default page;