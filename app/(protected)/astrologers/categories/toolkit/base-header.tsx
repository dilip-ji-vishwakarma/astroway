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
import { usePermission } from "@/src/context/PermissionContext";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  const { modules, role } = usePermission();
  const canAdd = role === "superadmin" || modules?.["Categories"]?.edit;
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Categories</PageHeaderLeft>
        {canAdd && (
          <PageHeaderRight>
            <CallToActionButton
              prependIcon={<Plus size={"18px"} />}
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Category
            </CallToActionButton>
          </PageHeaderRight>
        )}
      </PageHeader>
      <NewCategory open={open} onOpenChange={setOpen} />
    </>
  );
};