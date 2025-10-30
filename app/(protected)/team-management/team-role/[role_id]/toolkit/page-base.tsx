/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDataMutation } from "../hook/use-data-mutation";
import { Controller, useForm } from "react-hook-form";

export const PageBase = ({ response }: any) => {
  const { flatMenu, onSubmitApi, loading } =
    useDataMutation(response);

  // ✅ Build default values from response only once
  const defaultValues = React.useMemo(() => buildDefaultValues(response), [response]);
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  // ✅ Reset form if response changes (important for edit)
  React.useEffect(() => {
    reset(buildDefaultValues(response));
  }, [response, reset]);

  function buildDefaultValues(res: any) {
    const modules = res?.module || {};
    const defaults: any = {};
    Object.keys(modules).forEach((modName) => {
      const perms = modules[modName];
      if (typeof perms !== "object" || !perms) return;
      Object.keys(perms).forEach((perm) => {
        defaults[`${modName}.${perm}`] = perms[perm];
      });
    });
    return defaults;
  }

  const onSubmit = async (data: any) => {
    const formatted: any = {};
    Object.keys(data).forEach((key) => {
      const [moduleName, perm] = key.split(".");
      if (!formatted[moduleName]) formatted[moduleName] = {};
      formatted[moduleName][perm] = data[key];
    });
    await onSubmitApi(formatted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Role Permissions — {response?.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage access for each module below
            </p>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Module</TableHead>
                    <TableHead className="text-center">Create</TableHead>
                    <TableHead className="text-center">View</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {flatMenu.map((item, index) => {
                    const moduleName = item.title;
                    const modulePerms = response?.module?.[moduleName] || {};
                    const permKeys = Object.keys(modulePerms);
                    const isCrud = permKeys.some((p) =>
                      ["create", "view", "edit", "delete"].includes(p)
                    );

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.parent
                            ? `${item.parent} → ${item.title}`
                            : item.title}
                        </TableCell>

                        {isCrud ? (
                          ["create", "view", "edit", "delete"].map((perm) => (
                            <TableCell className="text-center" key={perm}>
                              <Controller
                                name={`${moduleName}.${perm}`}
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    checked={!!field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                )}
                              />
                            </TableCell>
                          ))
                        ) : (
                          <TableCell
                            colSpan={4}
                            className="text-center space-x-2"
                          >
                            {permKeys.map((perm) => (
                              <label
                                key={perm}
                                className="inline-flex items-center space-x-2 mx-2"
                              >
                                <Controller
                                  name={`${moduleName}.${perm}`}
                                  control={control}
                                  render={({ field }) => (
                                    <Checkbox
                                      checked={!!field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  )}
                                />
                                <span className="text-sm">{perm}</span>
                              </label>
                            ))}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                size="lg"
                className="rounded-xl"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </motion.div>
  );
};
