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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { useDataMutation } from "../hook/use-data-mutations";

const PageBase = ({ initialData, initialPagination }: any) => {
  const {
    data,
    page,
    totalPages,
    handlePrev,
    handleNext,
    setPage,
  } = useDataMutation(initialData, initialPagination);
  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">Name</TableHead>
            <TableHead className="px-[30px] py-5">Added By</TableHead>
            <TableHead className="px-[30px] py-5">Updated By</TableHead>
            <TableHead className="px-[30px] py-5">CreatedAt</TableHead>
            <TableHead className="px-[30px] py-5">Updated At</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="px-[30px] py-5">{item.id}</TableCell>
              <TableCell className="px-[30px] py-5">
                
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Image
                      src={"/images/wedding-ring.png"}
                      width={50}
                      height={50}
                      alt="avtar"
                    />
                    <span>{item.name}</span>
                  </div>
              
              </TableCell>
              <TableCell className="px-[30px] py-5">{item.addedBy}</TableCell>
              <TableCell className="px-[30px] py-5">{item.updatedBy}</TableCell>
              <TableCell className="px-[30px] py-5">{item.createdAt}</TableCell>
              <TableCell className="px-[30px] py-5">{item.updatedAt}</TableCell>
              <TableCell className="px-[30px] py-5"></TableCell>
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

export default PageBase;
