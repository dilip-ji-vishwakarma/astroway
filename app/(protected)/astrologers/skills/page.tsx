import { Loader } from "@/components/ui-kit/Loader";
import { Skill } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { Metadata } from "next";
import { BaseHeader } from "./toolkit/base-header";

export const metadata: Metadata = {
  title: 'Skills',
}

const Skills = async () => {
  const response = await apiServices(Skill, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader />
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Skills;