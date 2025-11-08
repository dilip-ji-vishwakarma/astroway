/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useDataMutation } from "../hook/use-data-mutation";
import { SearchAndFilter } from "@/components/ui-kit/SearchAndFilter";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSingleDate } from "@/lib/utils";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PageBase = () => {
  const {
    data = [],
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    search,
    setSearch,
    type,
    setType,
  } = useDataMutation();
  return (
    <div className="mt-8">
      <div className="flex gap-3">
        <SearchAndFilter
          label={`${pagination.total} Listings`}
          placeholder="Search customers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
            <SelectItem value="voice">Voice</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
                <TableHead className="px-[10px] py-5">User</TableHead>
                <TableHead className="px-[10px] py-5">Astrologer</TableHead>
                <TableHead className="px-[10px] py-5">Queue Id</TableHead>
                <TableHead className="px-[10px] py-5">Type</TableHead>
                <TableHead className="px-[10px] py-5">Started At</TableHead>
                <TableHead className="px-[10px] py-5">Ended At</TableHead>
                <TableHead className="px-[10px] py-5">
                  Charged Minutes
                </TableHead>
                <TableHead className="px-[10px] py-5">Total Amount</TableHead>
                <TableHead className="px-[10px] py-5">Commission Pct</TableHead>
                <TableHead className="px-[10px] py-5">
                  Commission Value
                </TableHead>
                <TableHead className="px-[10px] py-5">Wallet Updated</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-[10px] py-5 font-medium text-gray-700">
                      {item.id}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      {item.user.firstName} {item.user.lastName}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.astrologer.firstName} {item.astrologer.lastName}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.queueId || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.type || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.startedAt
                        ? formatSingleDate(item.startedAt, true)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.endedAt
                        ? formatSingleDate(item.endedAt, true)
                        : "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.chargedMinutes || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.totalAmount || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.commissionPct || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.commissionValue || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.isWalletUpdated ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={12}
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