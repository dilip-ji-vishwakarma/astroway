import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

const Page = () => {
  return (
    <Suspense>
      <TextH1>Session</TextH1>
      <PageBase />
    </Suspense>
  );
};

export default Page;