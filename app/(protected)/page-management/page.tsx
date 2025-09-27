import { Loader } from "@/components/ui-kit/Loader";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { pages } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

const PageManagement = async () => {
  const response = await apiServices(pages, "get");
  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Pages</TextH1>
      <PageBase initialData={response.data} />
    </Suspense>
  );
};

export default PageManagement;