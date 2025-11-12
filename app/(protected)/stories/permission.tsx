"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

const Permission = () => (
  <>
    <TextH1>Stories</TextH1>
    <PageBase />
  </>
);

export default withPermission("Stories")(Permission);
