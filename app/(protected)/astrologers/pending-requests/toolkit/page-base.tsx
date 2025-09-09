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
import Link from "next/link";
import { useDataMutation } from "../hook/use-data-mutations";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";

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
    handlePageChange,
    loading,
    submittingItems,
    setSearch,
    search,
    handleSwitchChange,
  } = useDataMutation(initialData, initialPagination);

  const { control } = useForm();

  return (
    <div className="mt-8">
      <SearchAndFilter
        label={`${pagination.total} Listings`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table className="mt-5 border border-solid">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[10px] py-5">#</TableHead>
            <TableHead className="px-[10px] py-5">First Name</TableHead>
            <TableHead className="px-[10px] py-5">Last Name</TableHead>
            <TableHead className="px-[10px] py-5">Phone</TableHead>
            <TableHead className="px-[10px] py-5">Email</TableHead>
            <TableHead className="px-[10px] py-5">City</TableHead>
            <TableHead className="px-[10px] py-5">State</TableHead>
            <TableHead className="px-[10px] py-5">Approved</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[10px] py-5">{item.id}</TableCell>
                <TableCell className="px-[10px] py-5">
                  {item.firstName}
                </TableCell>
                <TableCell className="px-[10px] py-5">
                  {item.lastName}
                </TableCell>
                <TableCell className="px-[10px] py-5">{item.phone}</TableCell>
                <TableCell className="px-[10px] py-5">
                  <Link
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </Link>
                </TableCell>
                <TableCell className="px-[10px] py-5">{item.city}</TableCell>
                <TableCell className="px-[10px] py-5">{item.state}</TableCell>
                <TableCell className="px-[10px] py-5">
                  {submittingItems.has(item.id) ? (
                    <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                  ) : (
                    <Controller
                      name={`isApproved-${item.id}`}
                      control={control}
                      defaultValue={item.isApproved}
                      render={({ field: { onChange, value } }) => (
                        <Switch
                          className="cursor-pointer"
                          checked={value}
                          disabled={submittingItems.has(item.id)}
                          onCheckedChange={(checked) => {
                            onChange(checked);
                            handleSwitchChange(item.id, checked);
                          }}
                        />
                      )}
                    />
                  )}
                </TableCell>
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

      {/* Pagination */}
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
