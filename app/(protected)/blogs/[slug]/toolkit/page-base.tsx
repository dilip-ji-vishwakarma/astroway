/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useDataMutations } from "../hook/use-data-mutations";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Editor from "react-simple-wysiwyg";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import useFilePreview from "@/hooks/use-file-preview";
import { Switch } from "@/components/ui/switch";

export const PageBase = ({ initialData }: any) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isSubmitting,
    watch,
    handleDelete,
    loading,
    errors
  } = useDataMutations(initialData.id, initialData);
  const coverFile = watch("cover") as File | null;
  const previewFile = watch("preview") as File | null;

  const coverPreview = useFilePreview(coverFile);
  const previewPreview = useFilePreview(previewFile);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[75%_25%] gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Edit Blog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <>
                <Label
                  htmlFor="title"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Title
                </Label>
                <Controller
                  name={`title`}
                  control={control}
                  defaultValue={initialData.title || ""}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      placeholder="Enter Title"
                      className="h-10"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </>
              <>
                <Controller
                  name={`contentHTML`}
                  control={control}
                  defaultValue={initialData.contentHTML || ""}
                  render={({ field: { onChange, value } }) => (
                    <Editor
                      className="h-[400px]"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </>
              <>
                <Label
                  htmlFor="summary"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Summary
                </Label>
                <Controller
                  name={`summary`}
                  control={control}
                  defaultValue={initialData.summary || ""}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      placeholder="Enter Summary"
                      className="h-10"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </>
              <>
                <Label
                  htmlFor="slug"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Slug
                </Label>
                <Controller
                  name={`slug`}
                  control={control}
                  defaultValue={initialData.slug || ""}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      placeholder="Enter Slug"
                      className="h-10"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </>
              <>
                <Label
                  htmlFor="publish_by"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Publish By
                </Label>
                <Controller
                  name={`publish_by`}
                  control={control}
                  defaultValue={initialData.publish_by || ""}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      className="h-10"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <span className="flex items-center justify-between">
                  <Label
                    htmlFor="isDraft"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Draft
                  </Label>
                  <Controller
                    name="isDraft"
                    control={control}
                    defaultValue={initialData.isDraft || ""}
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        className="cursor-pointer"
                        checked={value}
                        onCheckedChange={(checked) => {
                          onChange(checked);
                        }}
                      />
                    )}
                  />
                </span>
                <>
                  <Label
                    htmlFor="publishedAt"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Published On
                  </Label>
                  <Controller
                    name="publishedAt"
                    control={control}
                    defaultValue={initialData.publishedAt || ""}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!value}
                            className="w-full data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {value ? (
                              format(new Date(value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={value ? new Date(value) : undefined}
                            onSelect={(selectedDate) =>
                              onChange(
                                selectedDate ? selectedDate.toISOString() : null
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                 {errors["publishedAt"] && (
                  <span className="text-red-500 text-sm ">
                    Please Select published date
                  </span>
                )}
                </>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <>
                  <Label
                    htmlFor="cover"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Cover Image
                  </Label>
                  <Controller
                    name="cover"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input
                        accept="image/jpeg,image/png,image/webp"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (!file) return;

                          const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                          ];
                          if (!allowedTypes.includes(file.type)) {
                            alert("Only JPG, PNG, and WEBP files are allowed.");
                            return;
                          }

                          onChange(file); // store file in react-hook-form
                        }}
                      />
                    )}
                  />
                  {coverPreview ? (
                    <Image
                      src={coverPreview}
                      alt="preview"
                      height={300}
                      width={300}
                    />
                  ) : (
                    <Image
                      src={getImageUrl(initialData.coverImage)}
                      alt="preview"
                      height={300}
                      width={300}
                    />
                  )}
                </>
                <>
                  <Label
                    htmlFor="preview"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Preview Image
                  </Label>
                  <Controller
                    name="preview"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input
                        accept="image/jpeg,image/png,image/webp"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (!file) return;

                          const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                          ];
                          if (!allowedTypes.includes(file.type)) {
                            alert("Only JPG, PNG, and WEBP files are allowed.");
                            return;
                          }

                          onChange(file); // store file in react-hook-form
                        }}
                      />
                    )}
                  />

                  {previewPreview ? (
                    <Image
                      src={previewPreview}
                      alt="preview"
                      height={300}
                      width={300}
                    />
                  ) : (
                    <Image
                      src={getImageUrl(initialData.previewImage)}
                      alt="preview"
                      height={300}
                      width={300}
                    />
                  )}
                </>
              </CardContent>
              <CardFooter className="block space-y-3">
                <Button
                  type="submit"
                  className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
                  ) : (
                    <span>Update</span>
                  )}
                </Button>
                <Button
                  type="button"
                  className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white bg-red-500 focus:outline-none cursor-pointer"
                  onClick={handleDelete}
                >
                  {loading ? (
                    <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
                  ) : (
                    <span>Delete</span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};
