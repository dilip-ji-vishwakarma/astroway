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
    <div className="mt-10">
      <SearchAndFilter
        label={`${initialPagination.total} Listings`}
        placeholder="Search customers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-hidden border rounded-2xl shadow-sm mt-5">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">#</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Profile</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">First Name</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Last Name</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Phone</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Email</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Date Of Birth</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Time Of Birth</TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  <div className="w-7 h-7 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin m-auto" />
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item: any, index: number) => (
                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="px-6 py-5 text-gray-700 font-medium">{index + 1}</TableCell>

                  {/* Profile */}
                  <TableCell className="px-6 py-5">
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

                  {/* Names */}
                  <TableCell className="px-6 py-5 font-semibold text-gray-800">{item.firstName}</TableCell>
                  <TableCell className="px-6 py-5 font-semibold text-gray-800">{item.lastName}</TableCell>

                  {/* Contact */}
                  <TableCell className="px-6 py-5 text-gray-600">{item.phone}</TableCell>
                  <TableCell className="px-6 py-5 text-gray-600">{item.email}</TableCell>

                  {/* DOB / TOB */}
                  <TableCell className="px-6 py-5 text-gray-600">{formatSingleDate(item.dateOfBirth)}</TableCell>
                  <TableCell className="px-6 py-5 text-gray-600">{item.timeOfBirth}</TableCell>

                  {/* Action */}
                  <TableCell className="px-6 py-5">
                    <Link
                      href={`/customers/${item.id}`}
                      className="flex gap-2 items-center text-blue-600 hover:text-orange-500 transition"
                    >
                      <SquarePen size={18} /> Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-12 text-gray-500 text-sm">
                  🙋 No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end w-full mt-6">
        <MetaPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default PageBase;
