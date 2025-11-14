"use client";
import {
  CallToActionButton,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "@/components/ui-kit/page-header";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddNotification } from "./add_notification";
import { usePermission } from "@/src/context/PermissionContext";

export const BaseHeader = () => {
  const [open, setOpen] = useState(false);
  const { modules, role } = usePermission();
  const canAdd =
    role === "superadmin" || modules?.["Custom Notifications"]?.create;
  return (
    <>
      <PageHeader containerVariation="fluid" height="l">
        <PageHeaderLeft>Custom Notification</PageHeaderLeft>
        {canAdd && (
          <PageHeaderRight>
            <CallToActionButton onClick={() => setOpen(true)}>
              <Plus /> Add Notification
            </CallToActionButton>
          </PageHeaderRight>
        )}
      </PageHeader>
      <AddNotification open={open} onOpenChange={setOpen} />
    </>
  );
};