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
import { useDataMutation } from "../hook/use-data-mutations";
import Image from "next/image";
import { Loader2, Star, X } from "lucide-react";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";

const PageBase = () => {
  const {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    deletingId,
    handleDelete,
  } = useDataMutation();

  return (
    <div className="mt-8">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <div className="overflow-hidden border rounded-2xl shadow-sm mt-5">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  ID
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  By
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Astrologer
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Rating
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Comment
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Created At
                </TableHead>
                <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item: any, index: number) => (
                  <TableRow
                    key={item.id ?? index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-6 py-5 text-gray-700 font-medium">
                      {index + 1}
                    </TableCell>

                    {/* By User */}
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-2.5 font-semibold">
                        <Image
                            src={getImageUrl(item.by.avatarUrl)}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full"
                          />
                        <span>
                          {item.by?.firstName} {item.by?.lastName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Astrologer */}
                    <TableCell className="px-6 py-5 font-semibold text-gray-800">
                      {item.astrologer?.firstName} {item.astrologer?.lastName}
                    </TableCell>

                    {/* Rating */}
                    <TableCell className="px-6 py-5">
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

                    {/* Comment */}
                    <TableCell className="px-6 py-5 text-gray-600">
                      {item.comment || "-"}
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="px-6 py-5 text-gray-600">
                      {formatSingleDate(item.createdAt)}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="px-6 py-5 text-center">
                      {deletingId === item.id ? (
                        <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500 m-auto" />
                      ) : (
                        <X
                          color="#F70A18"
                          size={18}
                          className="border p-0.5 rounded-full border-solid border-[#F70A18] cursor-pointer hover:bg-[#f70a1820] transition"
                          onClick={() => handleDelete(item.id)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-gray-500 text-sm"
                  >
                    🙋 No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination - visible only when not loading and data exists */}
      {!loading && data.length > 0 && (
        <div className="flex justify-between items-center w-full mt-6">
          <MetaPagination
            total={pagination.total}
            value={pagination.page}
            recordPerPage={pagination.limit}
            onChange={handlePageChange}
          />
          <MetaPagination.PerPage
            value={pagination.limit}
            onChange={handleLimitChange}
          />
        </div>
      )}
    </div>
  );
};

export default PageBase;
