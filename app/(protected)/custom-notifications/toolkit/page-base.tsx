"use client";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import React from "react";
import { useDataMutation } from "../hook/use-data-mutation";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePermission } from "@/src/context/PermissionContext";

export const PageBase = () => {
  const {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    deletingId,
    handleDelete,
  } = useDataMutation();

  const { modules, role } = usePermission();
  const canEdit =
    role === "superadmin" || modules?.["Custom Notifications"]?.edit;
  const canDelete =
    role === "superadmin" || modules?.["Custom Notifications"]?.delete;

  return (
    <div className="mt-4 relative">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
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
                <TableHead className="px-[10px] py-5">Image</TableHead>
                <TableHead className="px-[10px] py-5">Title</TableHead>
                <TableHead className="px-[10px] py-5">Message</TableHead>
                <TableHead className="px-[10px] py-5">Type</TableHead>
                <TableHead className="px-[10px] py-5">Added By</TableHead>
                <TableHead className="px-[10px] py-5">Created At</TableHead>
                {(canEdit || canDelete) && (
                  <TableHead className="px-[10px] py-5 text-center">
                    Action
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-[10px] py-5 font-medium text-gray-700">
                      {item.id}
                    </TableCell>
                    <TableCell className="px-[10px] py-5">
                      <Image
                        src={getImageUrl(item.imageUrl)}
                        width={40}
                        height={40}
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.title || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.message || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.type || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 font-semibold text-gray-800">
                      {item.addedByAdmin.name || "-"}
                    </TableCell>
                    <TableCell className="px-[10px] py-5 text-gray-600">
                      {item.createdAt
                        ? formatSingleDate(item.createdAt, true)
                        : "-"}
                    </TableCell>
                    {(canEdit || canDelete) && (
                      <TableCell className="px-6 py-5 flex gap-2">
                        <div className="flex justify-end items-center gap-3">
                          {canEdit && (
                            <Button
                              variant="outline"
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer"
                              onClick={() => {}}
                              disabled
                            >
                              <SquarePen size={18} />
                            </Button>
                          )}
                          {canDelete && (
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
                          )}
                        </div>
                      </TableCell>
                    )}
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