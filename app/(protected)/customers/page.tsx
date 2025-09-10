import { Loader } from "@/components/ui-kit/Loader";
import React, { Suspense } from "react";
import PageBase from "./toolkit/page-base";
import { Metadata } from "next";
import { admin_users } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { BaseHeader } from "./toolkit/base-header";

export const metadata: Metadata = {
  title: 'Customers',
}

const Customers = async () => {
  const response = await apiServices(admin_users, "get");
  return (
    <Suspense fallback={<Loader />}>
      <BaseHeader response={response.data}/>
      <PageBase
        initialData={response.data}
        initialPagination={response.pagination}
      />
    </Suspense>
  );
};

export default Customers;
