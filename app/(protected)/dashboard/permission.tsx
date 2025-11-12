/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";

const Permission = ({response}: any) => (
  <>
    <PageBase data={response}/>
  </>
);

export default withPermission("Dashboard")(Permission);
