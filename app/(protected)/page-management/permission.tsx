/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

const Permission = ({ response }: any) => (
  <>
    <TextH1>Pages</TextH1>
    <PageBase initialData={response} />
  </>
);

export default withPermission("Page Management")(Permission);
