/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { BaseHeader } from "./toolkit/base_header";

const Permission = ({ response, roles }: any) => (
  <>
    <BaseHeader response={response} role={roles} />
    <PageBase roles={roles} />
  </>
);

export default withPermission("Team List")(Permission);
