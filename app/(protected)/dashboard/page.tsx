import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import { PageBase } from "./toolkit/page-base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
}

const Dashboard = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PageBase />
    </Suspense>
  );
};

export default Dashboard;
