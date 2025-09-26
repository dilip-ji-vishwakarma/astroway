"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateBanner } from "./create-banner";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Banners</PageHeaderLeft>
        <PageHeaderRight>
          <CallToActionButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Plus />
            Add Banners
          </CallToActionButton>
        </PageHeaderRight>
      </PageHeader>
      <CreateBanner open={open} onOpenChange={setOpen} />
    </>
  );
};
