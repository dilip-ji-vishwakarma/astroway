/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@/components/ui-kit/Loader";
import { user_details } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";

export const metadata: Metadata = {
  title: "Update Customer",
};

export type PageProps = {
  params: any;
};

const CustomerID = async ({ params }: PageProps) => {
  const { customer_id } = await params;
  const response = await apiServices(`${user_details}/${customer_id}`, "get");
  if (response.statusCode == 200) {
    return (
      <Suspense fallback={<Loader />}>
        <PageBase response={response} id={customer_id} />
      </Suspense>
    );
  } else {
    return <span>Api Response Not available</span>;
  }
};

export default CustomerID;
