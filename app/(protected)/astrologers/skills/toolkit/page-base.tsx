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
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { UpdateSkill } from "./update-skill";
import { DeleteSkill } from "./delete-skill";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";

export const PageBase = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedItemAlert, setSelectedItemAlert] = useState<any | null>(null);

  const {
    data,
    pagination,
    handlePageChange,
    loading,
    handleSwitchChange,
    submittingItems,
    handleLimitChange,
  } = useDataMutation();

  const { control } = useForm();

  return (
    <div className="mt-8 relative">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
      <Table
        className={`mt-5 ${loading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">Name</TableHead>
            <TableHead className="px-[30px] py-5">Status</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data && data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">{item.name}</TableCell>
                <TableCell className="px-[30px] py-5">
                  {submittingItems.has(item.id) ? (
                    <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-gray-200 border-t-blue-500"></div>
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
                <TableCell className="px-[30px] py-5 flex items-center gap-3">
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
                    onClick={() => {
                      setOpenAlert(true);
                      setSelectedItemAlert(item);
                    }}
                  >
                    <Trash2
                      color="currentColor"
                      size={18}
                      className="text-gray-600 hover:text-[#E25016]"
                    />
                  </Button>
                </TableCell>
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
      {/* Pagination */}
      {!loading && data && data.length > 0 && (
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
      <UpdateSkill
        open={open}
        onOpenChange={setOpen}
        name={selectedItem?.name}
        id={selectedItem?.id}
      />

      <DeleteSkill
        openAlert={openAlert}
        onOpenChange={setOpenAlert}
        id={selectedItemAlert?.id}
      />
    </div>
  );
};
