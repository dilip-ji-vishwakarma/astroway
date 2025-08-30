import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Customer',
}

const Customers = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PageBase />
    </Suspense>
  );
};

export default Customers;
