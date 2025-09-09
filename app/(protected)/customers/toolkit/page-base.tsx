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
import { useDataMutation } from "../hook/use-data-mutations";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserBlockUnblock } from "./user-block-unblock";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";

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
  const {
    data,
    pagination,
    handlePageChange,
    loading,
    setSearch,
    search,
  } = useDataMutation(initialData, initialPagination);

  const [open, setOpen] = useState(false);
  const [userRequest, setUserRequest] = useState(false);
  const [id, setId] = useState<string | number | undefined>(undefined);

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
            <TableHead className="px-[30px] py-5">First Name</TableHead>
            <TableHead className="px-[30px] py-5">Last Name</TableHead>
            <TableHead className="px-[30px] py-5">Phone</TableHead>
            <TableHead className="px-[30px] py-5">Wallet Balance</TableHead>
            <TableHead className="px-[30px] py-5">City</TableHead>
            <TableHead className="px-[30px] py-5">Date Of Birth</TableHead>
            <TableHead className="px-[30px] py-5">Time Of Birth</TableHead>
            <TableHead className="px-[30px] py-5">Place Of Birth</TableHead>
            <TableHead className="px-[30px] py-5">Created At</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
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
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">
                  <div className="flex items-center gap-2.5 font-semibold">
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
                    <span>
                      {item.firstName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-[30px] py-5 font-semibold"> {item.lastName}</TableCell>
                <TableCell className="px-[30px] py-5">{item.phone}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.walletBalance}
                </TableCell>
                <TableCell className="px-[30px] py-5">{item.city}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.dateOfBirth}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.timeOfBirth}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.placeOfBirth}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {item.createdAt}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  <Button
                    
                    onClick={() => {
                      setOpen(true);
                      setUserRequest(item.isBlocked);
                      setId(item.id);
                    }}
                    className="cursor-pointer w-[85px] primary-color"
                  >
                    {item.isBlocked ? "Unblock" : "Block"}
                  </Button>
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
      <UserBlockUnblock
        open={open}
        onOpenChange={setOpen}
        userRequest={userRequest}
        id={id}
      />
    </div>
  );
};

export default PageBase;