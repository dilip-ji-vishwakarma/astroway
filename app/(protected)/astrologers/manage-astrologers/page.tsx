import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manage Astrologers',
}

const AstrologerList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TextH1 className="mt-3">Manage Astrologers</TextH1>
      <PageBase/>
    </Suspense>
  );
};

export default AstrologerList;
