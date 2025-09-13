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
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";
import { useDataMutation } from "../hook/use-data-mutations";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { SquarePen } from "lucide-react";

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
  const { data, pagination, handlePageChange, loading, setSearch, search } =
    useDataMutation(initialData, initialPagination);

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
            <TableHead className="px-[20px] py-5">#</TableHead>
            <TableHead className="px-[20px] py-5">Profile</TableHead>
            <TableHead className="px-[20px] py-5">First Name</TableHead>
            <TableHead className="px-[20px] py-5">Last Name</TableHead>
            <TableHead className="px-[20px] py-5">Phone</TableHead>
            <TableHead className="px-[20px] py-5">Email</TableHead>
            <TableHead className="px-[20px] py-5">Date Of Birth</TableHead>
            <TableHead className="px-[20px] py-5">Time Of Birth</TableHead>
            <TableHead className="px-[20px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-8">
                <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.avatarUrl ? (
                    <Image
                      src={getImageUrl(item.avatarUrl)}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage src="/images/astrologer-placeholder.png" />
                    </Avatar>
                  )}
                </TableCell>
                <TableCell className="px-[30px] py-5 font-semibold">
                  {item.firstName}
                </TableCell>
                <TableCell className="px-[30px] py-5 font-semibold">
                  {" "}
                  {item.lastName}
                </TableCell>
                <TableCell className="px-[20px] py-5">{item.phone}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.email}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {formatSingleDate(item.dateOfBirth)}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.timeOfBirth}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  <Link
                    href={`/customers/${item.id}`}
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

export default PageBase;
