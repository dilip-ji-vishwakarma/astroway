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
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { useDataMutations } from "../hook/use-data-mutations";
import Image from "next/image";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const { data, pagination, loading, handlePageChange, load, handleDelete } =
    useDataMutations(initialData, initialPagination);

  return (
    <div className="mt-10">
      <div className="overflow-hidden border rounded-2xl shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">#</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Profile</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Name</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Media Type</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Views</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Created At</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Expired At</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Status</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  <div className="w-7 h-7 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin m-auto" />
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-5 text-gray-700 font-medium">{index + 1}</TableCell>
                  <TableCell className="px-6 py-5">
                    {item?.astrologer.avatarUrl ? (
                      <Image
                        src={getImageUrl(item?.astrologer.avatarUrl)}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/images/astrologer-placeholder.png" />
                      </Avatar>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-5 font-medium text-gray-800">
                    {item.astrologer.firstName} {item.astrologer.lastName}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {item.mediaType}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-gray-600 font-semibold">
                    {item.viewsCount}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-gray-600">
                    {formatSingleDate(item.createdAt, true)}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-gray-600">
                    {formatSingleDate(item.expiresAt, true)}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full",
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      )}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      {load === item.id ? (
                        <span className="w-[15px] h-[15px] animate-spin rounded-full border-2 border-t-primary border-gray-300"></span>
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-12 text-gray-500 text-sm"
                >
                  🚀 No records found. Try adjusting filters or add new entries.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end w-full mt-6">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
