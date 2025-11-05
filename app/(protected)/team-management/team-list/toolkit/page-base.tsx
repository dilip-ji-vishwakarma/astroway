/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useDataMutation } from "../hook/use-data-mutation";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { cn, formatSingleDate, getImageUrl } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UpdateTeam } from "./update_team";

export const PageBase = ({ roles }: any) => {
  const [roleEdit, setRoleEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const {
    data = [],
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleDelete,
    deletingId,
  } = useDataMutation();

  const handleEdit = (item: any) => {
    setRoleEdit(true);
    setSelectedItem(item);
  };

  return (
    <>
      <div className="mt-4 relative">
        <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-muted-foreground" size={32} />
          </div>
        ) : (
          <div
            className={cn(
              "overflow-hidden border rounded-2xl shadow-sm mt-4 transition-opacity duration-300",
              loading ? "opacity-50 pointer-events-none" : "opacity-100"
            )}
          >
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    ID
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Profile
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Name
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Phone
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Created At
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Updated At
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length > 0
                  ? data.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="px-6 py-5 text-gray-700 font-medium">
                          {item.id}
                        </TableCell>
                        <TableCell className="px-6 py-5">
                          <Image
                              src={getImageUrl(item.avatarUrl)}
                              width={40}
                              height={40}
                              alt="avatar"
                              className="rounded-full object-cover"
                            />
                        </TableCell>
                        <TableCell className="px-6 py-5 font-medium text-gray-800">
                          {item.name}
                        </TableCell>
                        <TableCell className="px-6 py-5">
                          {item.email}
                        </TableCell>
                        <TableCell className="px-6 py-5 text-gray-600 font-semibold">
                          {item.phone}
                        </TableCell>
                        <TableCell className="px-6 py-5 text-gray-600 font-semibold">
                          {item.role}
                        </TableCell>
                        <TableCell className="px-6 py-5 text-gray-600">
                          {formatSingleDate(item.createdAt, true)}
                        </TableCell>
                        <TableCell className="px-6 py-5 text-gray-600">
                          {formatSingleDate(item.updatedAt, true)}
                        </TableCell>
                        <TableCell className="px-6 py-5 flex gap-2">
                          <div className="flex justify-end items-center gap-3">
                            <Button
                              variant="outline"
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer"
                              onClick={() => handleEdit(item)}
                            >
                              <SquarePen size={18} />
                            </Button>
                            <Button
                              variant="outline"
                              className="cursor-pointer flex items-center justify-center"
                              onClick={() => handleDelete(item.id)}
                            >
                              {deletingId == item.id ? (
                                <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500 m-auto" />
                              ) : (
                                <Trash2 size={18} className="text-[#E25016]" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : !loading && (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-12 text-gray-500 text-sm"
                        >
                          🚀 No records found. Try adjusting filters or add new
                          entries.
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
      <UpdateTeam
        action={roleEdit}
        data={selectedItem}
        onOpenChange={setRoleEdit}
        role={roles}
      />
    </>
  );
};
