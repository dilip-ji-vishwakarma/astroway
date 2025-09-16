"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export const BaseHeader = () => {

  return (
    <>
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Commission Rate</PageHeaderLeft>
      <PageHeaderRight>
        <Button
          variant={"outline"}
          className="cursor-pointer border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white"
          onClick={() => {
            // setOpen(true);
          }}
        >
          <Plus />
          Add Commision
        </Button>
      </PageHeaderRight>
    </PageHeader>
    {/* <CreateSkill open={open} onOpenChange={setOpen}/> */}
    </>
  );
};
