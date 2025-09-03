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
import { useDataExportCSV } from "../hook/use-data-export-csv";

export const BaseHeader = ({ response }: any) => {
  const {handleExportCSV} = useDataExportCSV(response);

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
        <CallToActionButton
          onClick={handleExportCSV}
          prependIcon={<CloudDownload size={"18px"} />}
        >
          Export CSV
        </CallToActionButton>
      </PageHeaderRight>
    </PageHeader>
  );
};
