import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { apiServices } from "@/lib/api.services";
import { manage_astrologer } from "@/lib/api-endpoints";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manage Astrologers',
}

const AstrologerList = async () => {
  const response = await apiServices(manage_astrologer, "get");

  return (
    <Suspense fallback={<Loader />}>
      <TextH1 className="mt-3">Manage Astrologers</TextH1>
      <PageBase initialData={response.data} initialPagination={response.pagination} />
    </Suspense>
  );
};

export default AstrologerList;
