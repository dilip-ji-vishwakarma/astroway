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
      <PageHeaderLeft>Team Roles</PageHeaderLeft>
      <PageHeaderRight>
        <Link className="cursor-pointer text-sm flex items-center gap-1 md:p-2 p-1 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium" href={"/team-management/team-role/role"}><Plus /> Team Role</Link>
      </PageHeaderRight>
    </PageHeader>
  );
};
