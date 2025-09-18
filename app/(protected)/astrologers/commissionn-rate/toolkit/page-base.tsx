/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataMutation } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const {
    data,
    pagination,
    loading,
    handlePageChange,
  } = useDataMutation(initialData, initialPagination);
  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[20px] py-5">#</TableHead>
            <TableHead className="px-[20px] py-5">Commission Type</TableHead>
            <TableHead className="px-[20px] py-5">Astrologer</TableHead>
            <TableHead className="px-[20px] py-5">Astrologer Phone</TableHead>
            <TableHead className="px-[20px] py-5">Commission</TableHead>
            <TableHead className="px-[20px] py-5">Added By</TableHead>
            <TableHead className="px-[20px] py-5">Updated By</TableHead>
            <TableHead className="px-[20px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-8">
                <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                <TableCell className="px-[20px] py-5">{item.type}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.astrologer.firstName} {item.astrologer.lastName}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.astrologer.phone}
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.percent}</TableCell>
                <TableCell className="px-[20px] py-5">{item.addedBy}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.updatedBy}
                </TableCell>
                <TableCell className="px-[20px] py-5">-</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No data available
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
