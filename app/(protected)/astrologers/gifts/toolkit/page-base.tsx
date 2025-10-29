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
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { UpdateGift } from "./update-gift";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { useDataMutation } from "../hook/use-data-mutation";

export const PageBase = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    submittingItems,
    handleSwitchChange,
    handleDeleteGift,
    deletingItemId,
  } = useDataMutation();

  const { control } = useForm();

  return (
    <div className="mt-8 relative">
      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-muted-foreground" size={32} />
          </div>
        ) : (
          <Table className="mt-5 relative">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="px-[20px] py-5">#</TableHead>
                <TableHead className="px-[20px] py-5">Image</TableHead>
                <TableHead className="px-[20px] py-5">Name</TableHead>
                <TableHead className="px-[20px] py-5">Amount</TableHead>
                <TableHead className="px-[20px] py-5">Added By</TableHead>
                <TableHead className="px-[20px] py-5">Updated By</TableHead>
                <TableHead className="px-[20px] py-5">Status</TableHead>
                <TableHead className="px-[20px] py-5">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-[20px] py-5">{item.id}</TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.imageUrl ? (
                        <Image
                          src={getImageUrl(item.imageUrl)}
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
                    <TableCell className="px-[20px] py-5">
                      {item.name}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      ₹{item.amount}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.addedByAdmin?.name}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {item.updatedByAdmin?.name}
                    </TableCell>
                    <TableCell className="px-[20px] py-5">
                      {submittingItems.has(item.id) ? (
                        <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                      ) : (
                        <Controller
                          name={`isActive-${item.id}`}
                          control={control}
                          defaultValue={item.isActive}
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
                    <TableCell
                      align="right"
                      className="px-[30px] py-5 gap-3 flex items-center"
                    >
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
                        onClick={() => handleDeleteGift(item.id)}
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
                  <TableCell colSpan={8} className="text-center py-8">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination only when not loading */}
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

      <UpdateGift
        open={open}
        onOpenChange={setOpen}
        name={selectedItem?.name}
        amount={selectedItem?.amount}
        id={selectedItem?.id}
      />
    </div>
  );
};
