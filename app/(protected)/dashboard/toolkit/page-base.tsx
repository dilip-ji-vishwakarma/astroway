/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminCard } from "@/components/ui-kit/admin-card"
import { Graph } from "@/components/ui-kit/graph";
import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react"
import { DataTable } from "./DataTable";

export const PageBase = async ({data}: any) => {
  
  return (
    <Suspense fallback={<Loader />}>
      <AdminCard metric={data.weeklyMetric} />
      <div className="mt-10">
        <Graph monthlyGraph={data.monthlyGraph} />
      </div>
      <div className="mt-10">
        <DataTable unverifiedAstrologers={data.unverifiedAstrologers} />
      </div>
    </Suspense>
  )
}
