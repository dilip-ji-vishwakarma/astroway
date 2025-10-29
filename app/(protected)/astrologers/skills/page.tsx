import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { Metadata } from "next";
import { BaseHeader } from "./toolkit/base-header";

export const metadata: Metadata = {
  title: 'Skills',
}

const Skills = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase />
    </Suspense>
  );
};

export default Skills;