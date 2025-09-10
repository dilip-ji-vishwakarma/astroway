/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useDataMutation } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { formatSingleDate } from "@/lib/utils";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const { data, loading, pagination, handlePageChange } = useDataMutation(
    initialData,
    initialPagination
  );
  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">Name</TableHead>
            <TableHead className="px-[30px] py-5">Added By</TableHead>
            <TableHead className="px-[30px] py-5">Updated By</TableHead>
            <TableHead className="px-[30px] py-5">Created At</TableHead>
            <TableHead className="px-[30px] py-5">Updated At</TableHead>
            <TableHead className="px-[30px] py-5">Active</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
              </TableCell>
            </TableRow>
          ) : data && data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Image
                      src={"/images/wedding-ring.png"}
                      width={50}
                      height={50}
                      alt="avatar"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-[30px] py-5">{item.addedBy}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.updatedBy}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {formatSingleDate(item.createdAt)}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {formatSingleDate(item.updatedAt)}
                </TableCell>
                <TableCell className="px-[30px] py-5">—</TableCell>
                <TableCell className="px-[30px] py-5">—</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end w-full mt-4">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PageBase;
