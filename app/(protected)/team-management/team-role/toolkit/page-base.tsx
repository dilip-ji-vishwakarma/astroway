/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useDataMutation } from "../hook/use-data-mutation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSingleDate } from "@/lib/utils";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const PageBase = ({ response }: any) => {
  const { handleDelete } = useDataMutation();

  return (
    <>
    <Label className="text-md font-semibold mt-4">{`${response.length} Listings`}</Label>
    <div className="mt-5 border border-solid rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-[10px] py-5">ID</TableHead>
            <TableHead className="px-[10px] py-5">Name</TableHead>
            <TableHead className="px-[10px] py-5">Created At</TableHead>
            <TableHead className="px-[10px] py-5">Updated At</TableHead>
            <TableHead className="px-[35px] py-5 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {response.length > 0 ? (
            response.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="px-[10px] py-5">{item.id}</TableCell>
                <TableCell className="px-[10px] py-5">{item.name}</TableCell>
                <TableCell className="px-[10px] py-5">
                  {item.createdAt
                    ? formatSingleDate(item.createdAt, true)
                    : "-"}
                </TableCell>
                <TableCell className="px-[10px] py-5">
                  {item.updatedAt
                    ? formatSingleDate(item.updatedAt, true)
                    : "-"}
                </TableCell>
                <TableCell className=" py-5">
                  <div className="flex justify-end items-center gap-3">
                    <Link
                      href={`/team-management/team-role/${item.id}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer"
                    >
                      <SquarePen size={18} />
                    </Link>

                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="py-10 text-center text-gray-500 text-sm"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>
  );
};
