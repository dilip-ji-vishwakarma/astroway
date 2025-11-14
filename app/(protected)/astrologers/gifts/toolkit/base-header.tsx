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
import { usePermission } from "@/src/context/PermissionContext";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
    const { modules, role } = usePermission();
        const canAdd = role === "superadmin" || modules?.["Gifts"]?.create;
  return (
    <>
    <PageHeader containerVariation="fluid" height="l">
      <PageHeaderLeft>Gifts</PageHeaderLeft>
      {canAdd && (
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
      )}
    </PageHeader>
    <CreateGift open={open} onOpenChange={setOpen}/>
    </>
  );
};
