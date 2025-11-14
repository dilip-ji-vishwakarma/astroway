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
import { usePermission } from "@/src/context/PermissionContext";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  const { modules, role } = usePermission();
  const canAdd = role === "superadmin" || modules?.["Banner Management"]?.create;
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Banners</PageHeaderLeft>
        {canAdd && (
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
        )}
      </PageHeader>
      <CreateBanner open={open} onOpenChange={setOpen} />
    </>
  );
};