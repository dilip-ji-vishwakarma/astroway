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
import { SquarePen } from "lucide-react";
import { useDataMutations } from "../hook/use-data-mutations";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[20px] py-5">#</TableHead>
            <TableHead className="px-[20px] py-5">Image</TableHead>
            <TableHead className="px-[20px] py-5">Title</TableHead>
            <TableHead className="px-[20px] py-5">Slug</TableHead>
            <TableHead className="px-[20px] py-5">Tags</TableHead>
            <TableHead className="px-[20px] py-5">Draft</TableHead>
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
          ) : data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.previewImage ? (
                    <Image
                      src={getImageUrl(item.previewImage)}
                      width={50}
                      height={50}
                      alt="avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage src="/images/astrologer-placeholder.png" />
                    </Avatar>
                  )}
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.title}</TableCell>
                <TableCell className="px-[20px] py-5">{item.slug}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {(() => {
                    try {
                      const parsedTags = JSON.parse(item.tags);
                      return Array.isArray(parsedTags)
                        ? parsedTags.join(", ")
                        : item.tags;
                    } catch {
                      return item.tags;
                    }
                  })()}
                </TableCell>

                <TableCell className="px-[20px] py-5">
                  {item.isDraft == true ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.addedBy.name}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.updatedBy.name}
                </TableCell>
                <TableCell
                  align="right"
                  className="px-[30px] py-5 gap-3 flex items-center"
                >
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="flex gap-2 items-center hover:text-[#e25016]"
                  >
                    <SquarePen size={"18px"} /> Edit
                  </Link>
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
