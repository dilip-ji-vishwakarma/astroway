/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Controller } from "react-hook-form";
import { useDataMutation } from "../hook/use-data-mutation";
import { mainItems } from "@/lib/menuItems";

const apiModulePermissions: Record<string, Record<string, boolean>> = {
  "News": { edit: true, view: true, create: true, delete: true },
  "Blogs": { edit: false, view: true, create: false, delete: true },
  "Gifts": { edit: false, view: true, create: false, delete: false },
  "Skills": { edit: false, view: true, create: false, delete: false },
  "Reviews": { view: true, delete: false },
  "Session": { view: false },
  "Stories": { view: false, delete: false },
  "Feedback": { view: true },
  "Customers": { edit: false, view: true },
  "Dashboard": { view: true },
  "Team List": { edit: false, view: false, create: false, delete: false },
  "Team Role": { edit: false, view: false, create: false, delete: false },
  "Categories": { edit: false, view: true, create: false, delete: false },
  "Contact Form": { view: false },
  "Wallet History": { edit: false, view: false, create: false, delete: false },
  "Page Management": { edit: false, view: false },
  "Block Astrologer": { edit: false, view: true },
  "General Settings": { edit: false, view: false },
  "Pending Requests": { edit: false, view: true },
  "Banner Management": { edit: false, view: false, create: false, delete: false },
  "Manage Astrologers": { edit: true, view: true },
  "Withdrawal Methods": { edit: false, view: false, create: false, delete: false },
  "Withdrawal Requests": { edit: false, view: false, create: false, delete: false },
  "Custom Notifications": { edit: false, view: false, create: false, delete: false },
  "Commission Rate for Calls/Chats": { edit: false, view: true, create: false, delete: false }
};

const initializePermissions = (): Record<string, Record<string, boolean>> => {
  const permissions: Record<string, Record<string, boolean>> = {};

  Object.keys(apiModulePermissions).forEach((moduleName) => {
    permissions[moduleName] = {};
    Object.keys(apiModulePermissions[moduleName]).forEach((action) => {
      permissions[moduleName][action] = false;
    });
  });

  return permissions;
};



export const PageBase = () => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useDataMutation();

  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>(
    initializePermissions
  );

  const handleToggle = (module: string, action: string) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  const flattenedMenus = mainItems.flatMap((item: any) =>
    item.children
      ? item.children.map((child: any) => ({
          parent: item.title,
          title: child.title,
        }))
      : { parent: null, title: item.title }
  );


  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, permissions))}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Add New Role</h2>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-[150px] bg-[transparent] cursor-pointer text-sm flex items-center gap-1 md:p-2 p-1 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>

      <Card className="w-full mb-6">
        <CardContent>
          <div className="w-1/2">
            <Label htmlFor="name" className="text-slate-900 text-sm font-medium mb-2 block">
              Role
            </Label>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Type role name"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            {errors["name"] && (
              <span className="text-red-500 text-sm">Please Enter Role name</span>
            )}
          </div>
        </CardContent>
      </Card>

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
              const moduleName = menu.title;
              if (!permissions[moduleName]) return null;

              const modulePermissions = permissions[moduleName];

              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {menu.parent && (
                      <span className="text-muted-foreground mr-2">{menu.parent} ›</span>
                    )}
                    {moduleName}
                  </TableCell>
                  {["view", "create", "edit", "delete"].map((action) => {
                    const exists = action in modulePermissions;

                    return (
                      <TableCell key={action} className="text-center">
                        {exists ? (
                          <Checkbox
                            checked={modulePermissions[action]}
                            onCheckedChange={() => handleToggle(moduleName, action)}
                            className="
                              cursor-pointer
                              data-[state=checked]:bg-[#E25016]
                              data-[state=checked]:border-[#E25016]
                              data-[state=checked]:text-white
                              hover:border-[#E25016]
                              transition
                            "
                          />
                        ) : (
                          <div className="h-4 w-full"></div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </form>
  );
};