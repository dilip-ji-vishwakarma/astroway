import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

export const metadata: Metadata = {
  title: "Feedback",
};

const Feedback = async () => {
  return (
    <Suspense>
      <TextH1>Feedback</TextH1>
      <PageBase />
    </Suspense>
  );
};

export default Feedback;