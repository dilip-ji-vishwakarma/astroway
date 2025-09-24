"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BaseHeader = () => {
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Astroguru News</PageHeaderLeft>
      <PageHeaderRight>
          <Link className="border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white flex p-2 rounded-sm font-semibold" href={`/news/new-news`}> <Plus /> Add News</Link>
      </PageHeaderRight>
    </PageHeader>
  );
};
