"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateGift } from "./create-gift";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Gifts</PageHeaderLeft>
      <PageHeaderRight>
        <Button
          variant={"outline"}
          className="cursor-pointer border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus />
          Add Gift
        </Button>
      </PageHeaderRight>
    </PageHeader>
    <CreateGift open={open} onOpenChange={setOpen}/>
    </>
  );
};
