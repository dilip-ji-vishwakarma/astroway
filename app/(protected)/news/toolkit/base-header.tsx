"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { usePermission } from "@/src/context/PermissionContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BaseHeader = () => {
  const { modules, role } = usePermission();
  const canAdd = role === "superadmin" || modules?.["News"]?.create;
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Astroguru News</PageHeaderLeft>
      {canAdd && (
        <PageHeaderRight>
          <Link
            className="border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white flex p-2 rounded-sm font-semibold"
            href={`/news/new-news`}
          >
            {" "}
            <Plus /> Add News
          </Link>
        </PageHeaderRight>
      )}
    </PageHeader>
  );
};