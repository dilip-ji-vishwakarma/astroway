import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { BaseHeader } from "./toolkit/base_header";

const CustomNotifications = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase />
    </Suspense>
  );
};

export default CustomNotifications;
