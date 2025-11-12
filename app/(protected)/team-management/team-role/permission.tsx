/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { BaseHeader } from "./toolkit/base-header";

const Permission = ({ response }: any) => (
  <>
    <BaseHeader />
    <PageBase response={response} />
  </>
);

export default withPermission("Team Role")(Permission);
