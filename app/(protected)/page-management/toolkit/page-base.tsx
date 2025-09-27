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
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { formatSingleDate } from "@/lib/utils";
import Link from "next/link";

export const PageBase = ({ initialData }: any) => {
  return (
    <div className="mt-6 overflow-hidden border rounded-2xl shadow-sm px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData?.map((page: any, index:number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell>{formatSingleDate(page.createdAt, true)}</TableCell>
              <TableCell>{formatSingleDate(page.updatedAt, true)}</TableCell>

              <TableCell>
                {page.isActive ? (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-700"
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700"
                  >
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell align="right">
                <Link
                  href={`/page-management/${page.id}`}
                  className="justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 flex items-center gap-2 cursor-pointer w-[75px]"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
