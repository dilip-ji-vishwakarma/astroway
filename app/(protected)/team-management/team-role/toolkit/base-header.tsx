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
      <PageHeaderLeft>Team Roles</PageHeaderLeft>
      <PageHeaderRight>
        <CallToActionButton onClick={() => {}}><Plus /> Team Role</CallToActionButton>
      </PageHeaderRight>
    </PageHeader>
  );
};
