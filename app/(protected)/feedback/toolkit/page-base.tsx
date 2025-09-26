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
import Image from "next/image";
import { formatSingleDate, getImageUrl, cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDataMutations } from "../hook/use-data-mutations";

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
  const { data, pagination, loading, handlePageChange } = useDataMutations(
    initialData,
    initialPagination
  );

  return (
    <div className="mt-10">
      {/* Table container with rounded corners + shadow */}
      <div className="overflow-hidden border rounded-2xl shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                #
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                Profile
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                User
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                App
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                Feedback Date
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                Feedback
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="w-7 h-7 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin m-auto" />
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* ID */}
                  <TableCell className="px-6 py-5 text-gray-700 font-medium">
                    {index + 1}
                  </TableCell>

                  {/* Profile */}
                  <TableCell className="px-6 py-5">
                    {item?.by === "astrologer" ? (
                      item?.astrologer?.avatarUrl ? (
                        <Image
                          src={getImageUrl(item?.astrologer?.avatarUrl)}
                          width={40}
                          height={40}
                          alt="Astrologer"
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/images/astrologer-placeholder.png" />
                        </Avatar>
                      )
                    ) : item?.user?.avatarUrl ? (
                      <Image
                        src={getImageUrl(item?.user?.avatarUrl)}
                        width={40}
                        height={40}
                        alt="User"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/images/astrologer-placeholder.png" />
                      </Avatar>
                    )}
                  </TableCell>

                  {/* Name */}
                  <TableCell className="px-6 py-5 font-medium text-gray-800">
                    {item.by === "astrologer"
                      ? `${item.astrologer.firstName} ${item.astrologer.lastName}`
                      : `${item.user.firstName} ${item.user.lastName}`}
                  </TableCell>

                  {/* App badge */}
                  <TableCell className="px-6 py-5">
                    <span
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full",
                        item.by === "astrologer"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {item.by === "astrologer"
                        ? "Astrologer App"
                        : "User App"}
                    </span>
                  </TableCell>

                  {/* Feedback Date */}
                  <TableCell className="px-6 py-5 text-gray-600">
                    {formatSingleDate(item.createdAt, true)}
                  </TableCell>

                  {/* Feedback */}
                  <TableCell className="px-6 py-5 max-w-[300px] text-gray-700">
                    <p className="truncate" title={item.content}>
                      {item.content}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-gray-500 text-sm"
                >
                  🙌 No feedback available yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end w-full mt-6">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
