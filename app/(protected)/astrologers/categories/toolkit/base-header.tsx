"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { NewCategory } from "./new-category";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Categories</PageHeaderLeft>
      <PageHeaderRight>
        <CallToActionButton
        prependIcon={<Plus size={"18px"}/>}
        onClick={() => {setOpen(true)}}
        >
         Add Category
        </CallToActionButton>
      </PageHeaderRight>
    </PageHeader>
    <NewCategory open={open} onOpenChange={setOpen} />
    </>
  );
};
