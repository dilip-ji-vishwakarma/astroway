/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { PageBase } from "./toolkit/page-base";

const Permission = ({response}: any) => (
  <>
    <TextH1 className="mb-5">General Settings</TextH1>
    <PageBase response={response}/>
  </>
);

export default withPermission("General Settings")(Permission);
