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
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { useDataMutation } from "../hook/use-data-mutations";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { UpdateSkill } from "./update-skill";
import { DeleteSkill } from "./delete-skill";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
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
  } = useDataMutation(initialData, initialPagination);

  const { control } = useForm();

  return (
    <div className="mt-8">
      <Table className="mt-5">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[30px] py-5">#</TableHead>
            <TableHead className="px-[30px] py-5">Name</TableHead>
            <TableHead className="px-[20px] py-5">Added By</TableHead>
            <TableHead className="px-[20px] py-5">Updated By</TableHead>
            <TableHead className="px-[30px] py-5">Status</TableHead>
            <TableHead className="px-[30px] py-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
              </TableCell>
            </TableRow>
          ) : data && data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[30px] py-5">{item.id}</TableCell>
                <TableCell className="px-[30px] py-5">{item.name}</TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.addedByAdmin.name}
                </TableCell>
                <TableCell className="px-[20px] py-5">
                  {item.updatedByAdmin.name}
                </TableCell>
                <TableCell className="px-[30px] py-5">
                  {submittingItems.has(item.id) ? (
                    <div className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500"></div>
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
                      className=" text-gray-600 hover:text-[#E25016]"
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
                      className=" text-gray-600 hover:text-[#E25016]"
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

      <div className="flex justify-end w-full mt-4">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
      <div>
        <UpdateSkill
          open={open}
          onOpenChange={setOpen}
          name={selectedItem?.name}
          id={selectedItem?.id}
        />
      </div>
      <div>
        <DeleteSkill
          openAlert={openAlert}
          onOpenChange={setOpenAlert}
          id={selectedItemAlert?.id}
        />
      </div>
    </div>
  );
};
