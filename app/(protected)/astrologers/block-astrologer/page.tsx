import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { TextH1 } from "@/components/ui-kit/TextH1";
import PageBase from "./toolkit/page-base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Block Astrologer',
}

const AstrologerList = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <TextH1 className="mt-3">
        Block Astrologer
      </TextH1>
      <PageBase
      />
    </Suspense>
  );
};

export default AstrologerList;
