"use client";

import { withPermission } from "@/src/hoc/withPermission";
import { PageBase } from "./toolkit/page-base";
import { TextH1 } from "@/components/ui-kit/TextH1";

const Permission = () => (
  <>
    <TextH1>Withdrawal Requests</TextH1>
    <PageBase />
  </>
);

export default withPermission("Withdrawal Requests")(Permission);
