/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mainItems } from "@/lib/menuItems";
import { useDataMutation } from "../hook/use-data-mutation";


type PermissionTableProps = {
  response: any;
}

export const PageBase = ({ response }: PermissionTableProps) => {
  const [permissions, setPermissions] = useState(response?.module || {});
  const { mutate, isLoading } = useDataMutation();

  const flattenedMenus = mainItems.flatMap((item: any) => {
    if (item.children) {
      return item.children.map((child: any) => ({
        parent: item.title,
        title: child.title,
      }));
    }
    return { parent: null, title: item.title };
  });

  const handleToggle = (module: string, action: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module]?.[action],
      },
    }));
  };

  const handleUpdate = async () => {
    await mutate({
      id: response?.id,
      name: response?.name,
      module: permissions,
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          Role: {response?.name || "N/A"}
        </h2>
        <Button className="bg-[transparent] cursor-pointer text-sm flex items-center gap-1 md:p-2 p-1 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium" onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Permissions"}
        </Button>
      </div>

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
              const modulePermissions = permissions[menu.title] || {};
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
                        onCheckedChange={() =>
                          handleToggle(menu.title, action)
                        }
                        className="
                          cursor-pointer
                          data-[state=checked]:bg-[#E25016]
                          data-[state=checked]:border-[#E25016]
                          data-[state=checked]:text-white
                          hover:border-[#E25016]
                          transition
                        "
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
