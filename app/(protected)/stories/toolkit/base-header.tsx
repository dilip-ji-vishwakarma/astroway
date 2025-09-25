"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import React from "react";
import Link from "next/link";

export const BaseHeader = () => {
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>stories</PageHeaderLeft>
      <PageHeaderRight>
        <Link
        href={"/blogs/new-post"}
          className="border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white flex p-2 rounded-sm font-semibold"
        >
          <Plus />
          Add story
        </Link>
      </PageHeaderRight>
    </PageHeader>
  );
};
