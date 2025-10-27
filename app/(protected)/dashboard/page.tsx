import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { Metadata } from "next";
import { apiServices } from "@/lib/api.services";
import { dashboard } from "@/lib/api-endpoints";

export const metadata: Metadata = {
  title: 'Dashboard',
}

const Dashboard = async () => {
  const response = await apiServices(dashboard, "get");
  return (
    <Suspense fallback={<Loader />}>
      <PageBase data={response.data}/>
    </Suspense>
  );
};

export default Dashboard;
