"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { TextH1 } from "@/components/ui-kit/TextH1";
import { PageBase } from "./toolkit/page-base";

const Permission = () => (
  <>
    <TextH1>Feedback</TextH1>
    <PageBase />
  </>
);

export default withPermission("Feedback")(Permission);
