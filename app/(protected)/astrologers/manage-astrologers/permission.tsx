/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { BaseHeader } from "./toolkit/base-header";
import PageBase from "./toolkit/page-base";

const Permission = ({ response }: any) => (
  <>
    <BaseHeader response={response} />
    <PageBase />
  </>
);

export default withPermission("Manage Astrologers")(Permission);
