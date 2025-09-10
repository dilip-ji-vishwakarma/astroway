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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Star, X } from "lucide-react";
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

export const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const {
    data,
    handleDelete,
    deletingId,
    pagination,
    handlePageChange,
    loading,
  } = useDataMutation(initialData, initialPagination);

  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">By</TableHead>
            <TableHead className="px-[30px] py-5">Astrologer</TableHead>
            <TableHead className="px-[30px] py-5">Rating</TableHead>
            <TableHead className="px-[30px] py-5">Comment</TableHead>
            <TableHead className="px-[30px] py-5">Created At</TableHead>
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
          ) : data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">
                  <div className="flex items-center gap-2.5 font-semibold">
                    {item.by?.avatarUrl ? (
                      <Image
                        src={item.by.avatarUrl}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                    )}
                    <span>
                      {item.by?.firstName} {item.by?.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.astrologer?.firstName} {item.astrologer?.lastName}
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
                <TableCell className="px-[30px] py-5">{item.comment}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {formatSingleDate(item.createdAt)}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {deletingId === item.id ? (
                    <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500"></div>
                  ) : (
                    <X
                      color="#F70A18"
                      size={18}
                      className="border p-0.5 rounded-full border-solid border-[#F70A18] cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No records found.
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
