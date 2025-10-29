/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Loader2, MessageSquare, PhoneCall, SquarePen } from "lucide-react";
import { useDataMutation } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";

export default function PageBase() {
  const {
    data,
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
    <div className="p-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-6">
        <SearchAndFilter
          label={`${pagination.total} Listings`}
          placeholder="Search"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <>
          {/* TABLE SECTION */}
          <div className="overflow-x-auto border rounded-2xl shadow-sm">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-[20px] py-5">ID</TableHead>
                  <TableHead className="px-[20px] py-5">Profile</TableHead>
                  <TableHead className="px-[20px] py-5">First Name</TableHead>
                  <TableHead className="px-[20px] py-5">Last Name</TableHead>
                  <TableHead className="px-[20px] py-5">Email</TableHead>
                  <TableHead className="px-[20px] py-5">Phone</TableHead>
                  <TableHead className="px-[20px] py-5">Gender</TableHead>
                  <TableHead className="px-[20px] py-5">Request</TableHead>
                  <TableHead className="px-[20px] py-5">Approved</TableHead>
                  <TableHead className="px-[20px] py-5">Block</TableHead>
                  <TableHead className="px-[20px] py-5">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-4 py-2 text-sm text-gray-700">
                        {item.id}
                      </TableCell>
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
                      <TableCell className="px-4 py-2 text-sm text-gray-700">
                        {item.firstName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-700">
                        {item.lastName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-700">
                        <Link className="text-blue-500 hover:underline" href={`mailto:${item.email}`}>{item.email}</Link>
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-700">
                        {item.phone}
                      </TableCell>
                      <TableCell className="px-[20px] py-5">
                        {item.gender}
                      </TableCell>
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
                        {submittingItems.has(item.id) ? (
                          <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                        ) : (
                          <Controller
                            name={`isApproved-${item.id}`}
                            control={control}
                            defaultValue={item.isApproved}
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
                      <TableCell className="px-[20px] py-5">
                        {item.isBlocked ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="px-[20px] py-5">
                        <Link
                          href={`/astrologers/manage-astrologers/${item.id}`}
                          className="flex gap-2 items-center hover:text-[#e25016]"
                        >
                          <SquarePen size={"18px"} /> Edit
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="py-10 text-center text-gray-500 text-sm"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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
        </>
      )}
    </div>
  );
}