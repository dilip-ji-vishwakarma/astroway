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
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { useDataMutations } from "../hook/use-data-mutations";
import Image from "next/image";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const PageBase = ({
  initialData,
  initialPagination,
}: PageBaseProps) => {
  const { data, pagination, loading, handlePageChange } = useDataMutations(
    initialData,
    initialPagination
  );
  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[20px] py-5">#</TableHead>
            <TableHead className="px-[20px] py-5">Profile</TableHead>
            <TableHead className="px-[20px] py-5">Name</TableHead>
            <TableHead className="px-[20px] py-5">Media Type</TableHead>
            <TableHead className="px-[20px] py-5">Media</TableHead>
            <TableHead className="px-[20px] py-5">Views</TableHead>
            <TableHead className="px-[20px] py-5">Created At</TableHead>
            <TableHead className="px-[20px] py-5">Expired At</TableHead>
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
          ) : data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item?.astrologer.avatarUrl ? (
                    <Image
                      src={getImageUrl(item?.astrologer.avatarUrl)}
                      width={30}
                      height={30}
                      alt="avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage src="/images/astrologer-placeholder.png" />
                    </Avatar>
                  )}
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.astrologer.firstName} {item.astrologer.lastName}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.mediaType}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.mediaUrl ? (
                    <span>{item.mediaUrl}</span>
                  ) : (
                    <span>Not Avialable</span>
                  )}
                </TableCell>

                <TableCell className="px-[20px] py-5">
                  {item.viewsCount}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {formatSingleDate(item.createdAt, true)}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {formatSingleDate(item.expiresAt, true)}
                </TableCell>
                <TableCell
                  align="right"
                  className="px-[30px] py-5 gap-3 flex items-center"
                >
                  -
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
      <div className="flex justify-end w-full mt-4">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
