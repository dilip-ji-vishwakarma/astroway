"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { CloudDownload, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const CSVLink = dynamic(
  () => import("react-csv").then((mod) => mod.CSVLink),
  { ssr: false }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BaseHeader = ({response}: any) => {
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Team List</PageHeaderLeft>
      <PageHeaderRight>
        <CSVLink
          data={response}
          filename="team.csv"
          className="cursor-pointer text-sm flex items-center gap-1 md:p-2 p-1 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium"
        >
          <CloudDownload size={"18px"} />
          Export to CSV
        </CSVLink>
        <CallToActionButton onClick={() => {}}>
          <Plus /> Add Member
        </CallToActionButton>
      </PageHeaderRight>
    </PageHeader>
  );
};
