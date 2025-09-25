import { feedback } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

export const metadata: Metadata = {
  title: "Feedback",
};

const Feedback = async () => {
  const response = await apiServices(feedback, "get");
  return (
    <Suspense>
      <TextH1>Feedback</TextH1>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Feedback;