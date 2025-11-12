"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { BaseHeader } from "./toolkit/base-header";
import PageBase from "./toolkit/page-base";

const Permission = () => (
  <>
    <BaseHeader />
    <PageBase />
  </>
);

export default withPermission("Categories")(Permission);
