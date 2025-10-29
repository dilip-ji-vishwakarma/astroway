import React, { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { Metadata } from "next";
import PageBase from "./toolkit/page-base";

export const metadata: Metadata = {
  title: 'Reviews',
}

const Reviews = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <TextH1>Reviews</TextH1>
      <PageBase/>
    </Suspense>
  );
};

export default Reviews;