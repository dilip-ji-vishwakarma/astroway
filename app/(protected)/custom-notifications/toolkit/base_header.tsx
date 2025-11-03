"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";

export const BaseHeader = () => {
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Custom Notification</PageHeaderLeft>
        <PageHeaderRight>
          <CallToActionButton onClick={() => {}}>
            <Plus /> Add Notification
          </CallToActionButton>
        </PageHeaderRight>
      </PageHeader>
    </>
  );
};
