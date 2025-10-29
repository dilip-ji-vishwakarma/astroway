import { Loader } from "@/components/ui-kit/Loader";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

export const metadata: Metadata = {
  title: "Stories",
};

const Stories = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Stories</TextH1>
      <PageBase />
    </Suspense>
  );
};

export default Stories;
