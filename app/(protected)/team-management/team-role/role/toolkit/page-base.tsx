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

export const PageBase = () => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useDataMutation();

  // initialize permissions with all modules false
  const initializePermissions = () => {
    const permissions: Record<string, any> = {};
    mainItems.forEach((item: any) => {
      if (item.children) {
        item.children.forEach((child: any) => {
          permissions[child.title] = {
            view: false,
            create: false,
            edit: false,
            delete: false,
          };
        });
      } else {
        permissions[item.title] = {
          view: false,
          create: false,
          edit: false,
          delete: false,
        };
      }
    });
    return permissions;
  };

  const [permissions, setPermissions] = useState(initializePermissions);

  const handleToggle = (module: string, action: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  // flatten menu for table
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
            <Label
              htmlFor="name"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
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
              <span className="text-red-500 text-sm">
                Please Enter Role name
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Table */}
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
            {flattenedMenus.map((menu, idx) => (
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
                      checked={permissions[menu.title][action]}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </form>
  );
};
