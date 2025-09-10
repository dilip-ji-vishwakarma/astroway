import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { apiServices } from "@/lib/api.services";
import { TextH1 } from "@/components/ui-kit/TextH1";
import PageBase from "./toolkit/page-base";
import { pending_astrologer } from "@/lib/api-endpoints";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pending Astrologer',
}

const PendingAstrologer = async () => {
  const response = await apiServices(pending_astrologer, "get");

  return (
    <Suspense fallback={<Loader />}>
      <TextH1 className="mt-3">
        Pending Astrologer
      </TextH1>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default PendingAstrologer;
