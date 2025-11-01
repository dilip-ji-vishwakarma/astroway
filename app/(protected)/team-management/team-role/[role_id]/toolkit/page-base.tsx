/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mainItems } from "@/lib/menuItems";


interface PermissionTableProps {
  response: any;
}

export const PageBase: React.FC<PermissionTableProps> = ({ response }) => {
  const modules = response?.module || {};

  const flattenedMenus = mainItems.flatMap((item: any) => {
    if (item.children) {
      return item.children.map((child: any) => ({
        parent: item.title,
        title: child.title,
      }));
    }
    return { parent: null, title: item.title };
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Role: {response?.name || "N/A"}
      </h2>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-1/3 font-semibold">Module Name</TableHead>
              <TableHead className="text-center">View</TableHead>
              <TableHead className="text-center">Create</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {flattenedMenus.map((menu, idx) => {
              const modulePermissions = modules[menu.title] || {};
              const hasAnyPermission = Object.keys(modulePermissions).length > 0;

              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {menu.parent && (
                      <span className="text-muted-foreground mr-2">
                        {menu.parent} ›
                      </span>
                    )}
                    {menu.title}
                  </TableCell>
                  {["view", "create", "edit", "delete"].map((action) => (
                    <TableCell key={action} className="text-center">
                      <Checkbox
                        checked={!!modulePermissions[action]}
                        disabled={!hasAnyPermission}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
