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
import { Loader } from "@/components/ui-kit/Loader";
import { useDataMutation } from "../hook/use-data-mutations";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const PageBase = ({ initialData, initialPagination }: any) => {
  const {
    data,
    search,
    setSearch,
    page,
    totalPages,
    loading,
    handlePrev,
    handleNext,
    setPage,
  } = useDataMutation(initialData, initialPagination);

  return (
    <div className="mt-8">
      <SearchAndFilter
        label={`${initialPagination.total} Listings`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="h-[350px]">
          <Loader />
        </div>
      ) : (
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
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.firstName}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.lastName}
                </TableCell>
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
                <TableCell className="px-[30px] py-5">{item.rating}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {data.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          {search ? `No results found for "${search}"` : "No data available"}
        </div>
      )}

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