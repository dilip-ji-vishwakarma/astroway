"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import React from "react";

export const BaseHeader = () => {
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Categories</PageHeaderLeft>
      <PageHeaderRight>
        <CallToActionButton
        prependIcon={<Plus size={"18px"}/>}
        onClick={() => {}}
        >
         Add Category
        </CallToActionButton>
      </PageHeaderRight>
    </PageHeader>
  );
};
