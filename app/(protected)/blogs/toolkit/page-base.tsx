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
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { useDataMutation } from "../hook/use-data-mutations";
import { Label } from "@/components/ui/label";

export const PageBase = () => {
  const {
    data,
    pagination,
    loading,
    handlePageChange,
    handleLimitChange,
    handleDelete,
    load,
    submittingItems,
    handleSwitchChange,
  } = useDataMutation();

  const { control } = useForm();

  return (
    <div className="mt-8">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <Table className="mt-5">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-[20px] py-5">ID</TableHead>
              <TableHead className="px-[20px] py-5">Image</TableHead>
              <TableHead className="px-[20px] py-5">Title</TableHead>
              <TableHead className="px-[20px] py-5">Slug</TableHead>
              <TableHead className="px-[20px] py-5">Tags</TableHead>
              <TableHead className="px-[20px] py-5">Draft</TableHead>
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
                    {item.previewImage ? (
                      <Image
                        src={getImageUrl(item.previewImage)}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar>
                        <AvatarImage src="/images/astrologer-placeholder.png" />
                      </Avatar>
                    )}
                  </TableCell>

                  <TableCell className="px-[20px] py-5">{item.title}</TableCell>
                  <TableCell className="px-[20px] py-5">{item.slug}</TableCell>

                  <TableCell className="px-[20px] py-5">
                    {(() => {
                      try {
                        const parsedTags = JSON.parse(item.tags);
                        return Array.isArray(parsedTags)
                          ? parsedTags.join(", ")
                          : item.tags;
                      } catch {
                        return item.tags;
                      }
                    })()}
                  </TableCell>

                  <TableCell className="px-[20px] py-5">
                    {submittingItems.has(item.id) ? (
                      <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                    ) : (
                      <Controller
                        name={`isPublished-${item.id}`}
                        control={control}
                        defaultValue={item.isDraft}
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
                    {item.addedBy?.name}
                  </TableCell>

                  <TableCell className="px-[20px] py-5">
                    {item.updatedBy?.name}
                  </TableCell>

                  <TableCell
                    align="right"
                    className="px-[30px] py-5 gap-3 flex items-center"
                  >
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer"
                    >
                      <SquarePen size={18} />
                    </Link>

                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      {load === item.id ? (
                        <div className="w-[15px] h-[15px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
