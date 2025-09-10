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
import { Star } from "lucide-react";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";
import { useDataMutation } from "../hook/use-data-mutations";
import { formatSingleDate } from "@/lib/utils";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const { data, pagination, loading, handlePageChange,
    setSearch, search } = useDataMutation(
    initialData,
    initialPagination
  );

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <SearchAndFilter
        label={`${pagination.total} Listings`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">First Name</TableHead>
            <TableHead className="px-[30px] py-5">Last Name</TableHead>
            <TableHead className="px-[30px] py-5">Phone</TableHead>
            <TableHead className="px-[30px] py-5">Email</TableHead>
            <TableHead className="px-[30px] py-5">City</TableHead>
            <TableHead className="px-[30px] py-5">State</TableHead>
            <TableHead className="px-[30px] py-5">Approved</TableHead>
            <TableHead className="px-[30px] py-5">Blocked</TableHead>
            <TableHead className="px-[30px] py-5">Rating</TableHead>
            <TableHead className="px-[30px] py-5">Created At</TableHead>
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
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">{item.firstName}</TableCell>
                <TableCell className="px-[30px] py-5">{item.lastName}</TableCell>
                <TableCell className="px-[30px] py-5">{item.phone}</TableCell>
                <TableCell className="px-[30px] py-5">
                  <Link
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </Link>
                </TableCell>
                <TableCell className="px-[30px] py-5">{item.city}</TableCell>
                <TableCell className="px-[30px] py-5">{item.state}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.isApproved ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.isBlocked ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= item.rating
                            ? "fill-[#F8D3C5] text-[#F8D3C5]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-[30px] py-5">{formatSingleDate(item.createdAt)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                {search
                  ? `No results found for "${search}"`
                  : "No data available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end w-full mt-4">
        <MetaPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default PageBase;
