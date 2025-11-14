"use client";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateSkill } from "./create-skill";
import { usePermission } from "@/src/context/PermissionContext";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  const { modules, role } = usePermission();
  const canAdd = role === "superadmin" || modules?.["Skills"]?.edit;
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Skills</PageHeaderLeft>
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
              Add Skill
            </Button>
          </PageHeaderRight>
        )}
      </PageHeader>
      <CreateSkill open={open} onOpenChange={setOpen} />
    </>
  );
};