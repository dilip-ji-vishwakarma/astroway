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
import Link from "next/link";
import { useDataMutation } from "../hook/use-data-mutations";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Loader2 } from "lucide-react";

export const PageBase = () => {
  const {
    data = [],
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    search,
    setSearch,
    submittingItems,
    handleSwitchChange,
  } = useDataMutation();

  const { control } = useForm();

  return (
    <div className="mt-8">
      <SearchAndFilter
        label={`${pagination.total} Listings`}
        placeholder="Search"
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
                <TableHead className="px-[10px] py-5">Date</TableHead>
                <TableHead className="px-[10px] py-5">Reason</TableHead>
                <TableHead className="px-[10px] py-5 text-center">
                  Blocked
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-[10px] py-5">{item.id}</TableCell>
                    <TableCell className="px-[10px] py-5">
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
                    <TableCell className="px-[10px] py-5">
                      {item.firstName || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      {item.lastName || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      {item.phone || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
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
                    <TableCell className="px-[10px] py-5">
                      {item.createdAt
                        ? formatSingleDate(item.createdAt, true)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      {item.blockedReason || "Not Added"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-center">
                      {submittingItems.has(item.id) ? (
                        <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500"></div>
                      ) : (
                        <Controller
                          name={`isBlocked-${item.id}`}
                          control={control}
                          defaultValue={item.isBlocked}
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              className="cursor-pointer"
                              checked={value}
                              disabled={submittingItems.has(item.id)}
                              onCheckedChange={(checked) => {
                                onChange(checked);
                                handleSwitchChange(item.id, checked);
                              }}
                            />
                          )}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-gray-500 text-sm"
                  >
                    No data found
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