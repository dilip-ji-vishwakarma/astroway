/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useDataMutation } from "../hook/use-data-mutations";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserBlockUnblock } from "./user-block-unblock";

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
   const [open, setOpen] = useState(false);
   const [userRequest, setUserRequest] = useState(false);
   const [id, setId] = useState()
  return (
    <div className="mt-8">
      <SearchAndFilter
        label={`${initialPagination.total} Listings`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">Name</TableHead>
            <TableHead className="px-[30px] py-5">Phone</TableHead>
            <TableHead className="px-[30px] py-5">Wallet Balance</TableHead>
            <TableHead className="px-[30px] py-5">City</TableHead>
            <TableHead className="px-[30px] py-5">Date Of Birth</TableHead>
            <TableHead className="px-[30px] py-5">Time Of Birth</TableHead>
            <TableHead className="px-[30px] py-5">Place Of Birth</TableHead>
            {/* <TableHead className="px-[30px] py-5">Blocked</TableHead> */}
            <TableHead className="px-[30px] py-5">Created At</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="px-[30px] py-5">{item.id}</TableCell>
              <TableCell className="px-[30px] py-5">
                {item.avatarUrl == null ? (
                  <div className="flex items-center gap-2.5 font-semibold">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span>
                      {item.firstName} {item.lastName}
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
                      {item.firstName} {item.lastName}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell className="px-[30px] py-5">{item.phone}</TableCell>
              <TableCell className="px-[30px] py-5">
                {item.walletBalance}
              </TableCell>
              <TableCell className="px-[30px] py-5">{item.city}</TableCell>
              <TableCell className="px-[30px] py-5">{item.dateOfBirth}</TableCell>
              <TableCell className="px-[30px] py-5">{item.timeOfBirth}</TableCell>
              <TableCell className="px-[30px] py-5">{item.placeOfBirth}</TableCell>
              {/* <TableCell className="px-[30px] py-5">
                {item.isBlocked ? "Yes" : "No"}
              </TableCell> */}
              <TableCell className="px-[30px] py-5">{item.createdAt}</TableCell>
              <TableCell className="px-[30px] py-5">
                <Button onClick={() => {setOpen(true); setUserRequest(item.isBlocked); setId(item.id)}} className="cursor-pointer primary-color w-[85px]">
                  {item.isBlocked === true ? "Unblock" : "Block"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
      <UserBlockUnblock open={open} onOpenChange={setOpen} userRequest={userRequest} id={id}/>
    </div>
  );
};

export default PageBase;
