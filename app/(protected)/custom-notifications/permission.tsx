"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { BaseHeader } from "./toolkit/base_header";

const Permission = () => (
  <>
    <BaseHeader />
    <PageBase />
  </>
);

export default withPermission("Custom Notifications")(Permission);
