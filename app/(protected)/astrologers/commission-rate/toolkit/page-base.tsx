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
import { useDataMutation } from "../hook/use-data-mutations";
import { Button } from "@/components/ui/button";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { UpdateCommission } from "./update-commission";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";

export const PageBase = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleDeleteCommission,
    deletingItemId,
  } = useDataMutation();

  return (
    <div className="mt-8">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <>
          <Table className="mt-5">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="px-[20px] py-5">ID</TableHead>
                <TableHead className="px-[20px] py-5">
                  Commission Type
                </TableHead>
                <TableHead className="px-[20px] py-5">Astrologer</TableHead>
                <TableHead className="px-[20px] py-5">
                  Astrologer Phone
                </TableHead>
                <TableHead className="px-[20px] py-5">Commission</TableHead>
                <TableHead className="px-[20px] py-5">Added By</TableHead>
                <TableHead className="px-[20px] py-5">Updated By</TableHead>
                <TableHead className="px-[20px] py-5">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data && data.length > 0 ? (
                data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.type}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.astrologer?.firstName} {item.astrologer?.lastName}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.astrologer?.phone}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.percent}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.addedByAdmin?.name}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.updatedByAdmin?.name}
                    </TableCell>
                    <TableCell className="px-[30px] py-5 gap-3 flex items-center">
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          setOpen(true);
                          setSelectedItem(item);
                        }}
                      >
                        <SquarePen
                          color="currentColor"
                          size={18}
                          className="text-gray-600 hover:text-[#E25016]"
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleDeleteCommission(item.id)}
                      >
                        {deletingItemId === item.id ? (
                          <div className="w-[15px] h-[15px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                        ) : (
                          <Trash2
                            color="currentColor"
                            size={18}
                            className="text-gray-600 hover:text-[#E25016]"
                          />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {data.length > 0 && (
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

      {/* Update Modal */}
      <UpdateCommission
        open={open}
        onOpenChange={setOpen}
        type={selectedItem?.type}
        astrologer={selectedItem?.astrologer}
        percent={selectedItem?.percent}
        id={selectedItem?.id}
      />
    </div>
  );
};

export default PageBase;