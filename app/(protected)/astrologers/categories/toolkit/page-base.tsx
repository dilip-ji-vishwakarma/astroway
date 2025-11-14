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
import { useDataMutation } from "../hook/use-data-mutations";
import { getImageUrl } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateCategory } from "./update-category";
import { Label } from "@/components/ui/label";
import { DeleteCategory } from "./delete-category";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { usePermission } from "@/src/context/PermissionContext";

const PageBase = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItemAlert, setSelectedItemAlert] = useState<any | null>(null);

  const {
    data,
    loading,
    pagination,
    handlePageChange,
    submittingItems,
    handleSwitchChange,
    handleLimitChange,
  } = useDataMutation();

  const { control } = useForm();
  const { modules, role } = usePermission();
  const canEdit = role === "superadmin" || modules?.["Categories"]?.edit;
  const canDelete = role === "superadmin" || modules?.["Categories"]?.delete;

  return (
    <div className="mt-8">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>

      {/* Loader at the top only */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <Table className="mt-5">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-[30px] py-5">ID</TableHead>
              <TableHead className="px-[30px] py-5">Image</TableHead>
              <TableHead className="px-[30px] py-5">Name</TableHead>
              <TableHead className="px-[30px] py-5">Added By</TableHead>
              <TableHead className="px-[30px] py-5">Updated By</TableHead>
              {canEdit && (
                <TableHead className="px-[30px] py-5">Status</TableHead>
              )}
              {(canEdit || canDelete) && (
                <TableHead className="px-[30px] py-5">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                  <TableCell className="px-[30px] py-5">
                    <Image
                      src={getImageUrl(item.icon)}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="px-[30px] py-5">{item.name}</TableCell>
                  <TableCell className="px-[30px] py-5">
                    {item.addedByAdmin?.name}
                  </TableCell>
                  <TableCell className="px-[30px] py-5">
                    {item.updatedByAdmin?.name}
                  </TableCell>
                  {canEdit && (
                    <TableCell className="px-[30px] py-5">
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
                  )}
                  {(canEdit || canDelete) && (
                    <TableCell className="px-[30px] py-5 gap-3 flex items-center">
                      {canEdit && (
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
                            className="text-gray-600"
                          />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => {
                            setOpenAlert(true);
                            setSelectedItemAlert(item);
                          }}
                        >
                          <Trash2
                            color="currentColor"
                            size={18}
                            className="text-gray-600"
                          />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination (only when data available) */}
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

      {/* Modals */}
      <UpdateCategory
        open={open}
        onOpenChange={setOpen}
        name={selectedItem?.name}
        id={selectedItem?.id}
      />
      <DeleteCategory
        openAlert={openAlert}
        onOpenChange={setOpenAlert}
        id={selectedItemAlert?.id}
      />
    </div>
  );
};

export default PageBase;