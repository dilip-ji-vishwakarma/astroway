/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { CloudDownload, Plus } from "lucide-react";
import React from "react";
import dynamic from "next/dynamic";

const CSVLink = dynamic(
  () => import("react-csv").then((mod) => mod.CSVLink),
  { ssr: false }
);

export const BaseHeader = ({ response }: any) => {
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Customers</PageHeaderLeft>
      <PageHeaderRight>
        <CallToActionButton
          onClick={() => alert("Create clicked")}
          prependIcon={<Plus size={"18px"} />}
        >
          Add Customer
        </CallToActionButton>

        <CSVLink
          data={response}
          filename="customers.csv"
          className="cursor-pointer text-sm flex items-center gap-1 md:p-2 p-1 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium"
        >
          <CloudDownload size={"18px"} />
          Export to CSV
        </CSVLink>
      </PageHeaderRight>
    </PageHeader>
  );
};
