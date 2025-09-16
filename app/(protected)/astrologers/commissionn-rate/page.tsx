import { Loader } from "@/components/ui-kit/Loader";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { BaseHeader } from "./toolkit/base-header";
import { commision } from "@/lib/api-endpoints";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Commission Rate for Calls/Chats",
};

const CommissionnRate = async () => {
  const response = await apiServices(commision, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default CommissionnRate;
