/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";


export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Blogs</PageHeaderLeft>
      <PageHeaderRight>
        <Button
          variant={"outline"}
          className="cursor-pointer border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus />
          Add Blog
        </Button>
      </PageHeaderRight>
    </PageHeader>
  );
};
