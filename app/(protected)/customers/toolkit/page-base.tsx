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
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { SquarePen, Loader2 } from "lucide-react";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";

const PageBase = () => {
  const {
    data = [],
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    search,
    setSearch,
  } = useDataMutation();

  return (
    <div className="mt-8">
      <SearchAndFilter
        label={`${pagination.total} Listings`}
        placeholder="Search customers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <div className="mt-5 border border-solid rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="px-[10px] py-5">ID</TableHead>
                <TableHead className="px-[10px] py-5">Profile</TableHead>
                <TableHead className="px-[10px] py-5">First Name</TableHead>
                <TableHead className="px-[10px] py-5">Last Name</TableHead>
                <TableHead className="px-[10px] py-5">Phone</TableHead>
                <TableHead className="px-[10px] py-5">Email</TableHead>
                <TableHead className="px-[10px] py-5">Date of Birth</TableHead>
                <TableHead className="px-[10px] py-5">Time of Birth</TableHead>
                <TableHead className="px-[10px] py-5 text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item: any, index: number) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-[10px] py-5 font-medium text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      {item.avatarUrl ? (
                        <Image
                          src={getImageUrl(item.avatarUrl)}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-full object-cover shadow-sm"
                        />
                      ) : (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/images/astrologer-placeholder.png" />
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.firstName || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.lastName || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.phone || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.email ? (
                        <Link
                          href={`mailto:${item.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.email}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.dateOfBirth
                        ? formatSingleDate(item.dateOfBirth)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.timeOfBirth || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-center">
                      <Link
                        href={`/customers/${item.id}`}
                        className="flex gap-2 items-center hover:text-[#e25016]"
                      >
                        <SquarePen size={18} />
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-gray-500 text-sm"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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