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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Star, X } from "lucide-react";

export const PageBase = ({ initialData, initialPagination }: any) => {
  const {
    data,
    page,
    totalPages,
    handlePrev,
    handleNext,
    setPage,
    handleDelete,
    deletingId,
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
            <TableHead className="px-[30px] py-5">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="px-[30px] py-5">{item.id}</TableCell>
              <TableCell className="px-[30px] py-5">
                {item.by.avatarUrl == null ? (
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span>
                      {item.by.firstName} {item.by.lastName}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Image
                      src={item.avatarUrl}
                      width={50}
                      height={50}
                      alt="avtar"
                    />
                    <span>
                      {item.by.firstName} {item.by.lastName}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell className="px-[30px] py-5">
                {item.astrologer.firstName} {item.astrologer.lastName}
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
              <TableCell className="px-[30px] py-5">{item.createdAt}</TableCell>
              <TableCell className="px-[30px] py-5">
                {deletingId === (item.id) ? (
                  <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500"></div>
                ) : (
                  <X
                    color="#F70A18"
                    size={18}
                    className="border p-0.5 rounded-[50%] border-solid border-[#F70A18] cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-6">
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Page 1 */}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Page 2 (always show if exists) */}
          {totalPages >= 2 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 2}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(2);
                }}
              >
                2
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis after 2 if current page > 3 */}
          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Middle current page if > 2 and < totalPages */}
          {page > 2 && page < totalPages && (
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis before last */}
          {page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {totalPages > 2 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === totalPages}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
