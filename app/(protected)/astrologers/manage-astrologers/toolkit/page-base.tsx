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
import Link from "next/link";
import { MessageSquare, PhoneCall, SquarePen } from "lucide-react";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";
import { useDataMutation } from "../hook/use-data-mutations";
import Image from "next/image";
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

const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const { data, pagination, loading, handlePageChange, setSearch, search } =
    useDataMutation(initialData, initialPagination);

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <SearchAndFilter
        label={`${pagination.total} Listings`}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[20px] py-5">#</TableHead>
            <TableHead className="px-[20px] py-5">Profile</TableHead>
            <TableHead className="px-[20px] py-5">First Name</TableHead>
            <TableHead className="px-[20px] py-5">Last Name</TableHead>
            <TableHead className="px-[20px] py-5">Phone</TableHead>
            <TableHead className="px-[20px] py-5">Email</TableHead>
            <TableHead className="px-[20px] py-5">Gender</TableHead>
            <TableHead className="px-[20px] py-5">Total Request</TableHead>
            <TableHead className="px-[20px] py-5">Approved</TableHead>
            <TableHead className="px-[20px] py-5">Blocked</TableHead>
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
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.avatarUrl ? (
                    <Image
                      src={item.avatarUrl}
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
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.firstName}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.lastName}
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.phone}</TableCell>
                <TableCell className="px-[20px] py-5">
                  <Link
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </Link>
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.gender}</TableCell>
                <TableCell className="px-[20px] py-5">
                  <div className="flex justify-center gap-2.5 items-center">
                  <div className="flex gap-[5px] items-center justify-center font-medium">
                    <PhoneCall size={"16px"} /> 
                    <span>{item.callBookings}</span>
                  </div>
                  <span>/</span>
                  <div className="flex gap-[5px] items-center justify-center">
                    <MessageSquare size={"16px"} /> 
                    <span>{item.chatBookings}</span>
                  </div>
                  </div>
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.isApproved ? "Yes" : "No"}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.isBlocked ? "Yes" : "No"}
                </TableCell>

                <TableCell className="px-[20px] py-5">
                  <Link href={`/astrologers/manage-astrologers/${item.id}`} className="flex gap-2 items-center hover:text-[#e25016]"><SquarePen size={"18px"} /> Edit</Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={11}
                className="text-center py-8 text-gray-500"
              >
                {search
                  ? `No results found for "${search}"`
                  : "No data available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end w-full mt-4">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PageBase;
