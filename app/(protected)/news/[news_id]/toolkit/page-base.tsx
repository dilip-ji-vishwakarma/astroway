/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable   @next/next/no-img-element */
"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDataMutations } from "../hook/use-data-mutations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import useFilePreview from "@/hooks/use-file-preview";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const PageBase = (response: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const data = response.response;
  const { onSubmit, handleDelete, loading } = useDataMutations(data);
  const coverFile = watch("image") as File | null;
  const coverPreview = useFilePreview(coverFile);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[75%_25%] gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Update News</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <>
              <Label
                htmlFor="channel"
                className="text-slate-900 text-sm font-medium block"
              >
                Channel
              </Label>
              <Controller
                name="channel"
                control={control}
                defaultValue={data.channel}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    className=""
                    placeholder="Channel"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors["channel"] && (
                <span className="text-red-500 text-sm ">
                  Please Enter channel
                </span>
              )}
            </>
            <>
              <Label
                htmlFor="link"
                className="text-slate-900 text-sm font-medium block"
              >
                Link
              </Label>
              <Controller
                name="link"
                control={control}
                defaultValue={data.link}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="url"
                    className=""
                    placeholder="Link"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors["link"] && (
                <span className="text-red-500 text-sm ">Please Enter Link</span>
              )}
            </>
            <>
              <Label
                htmlFor="description"
                className="text-slate-900 text-sm font-medium block"
              >
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                defaultValue={data.description}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Textarea value={value} onChange={onChange} />
                )}
              />
            </>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-3">
            <div className=" border border-slate-200 p-2 rounded-md w-full max-w-md">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm font-medium text-slate-600">
                  Added By
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {data.addedByAdmin?.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm font-medium text-slate-600">
                  Updated By
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {data.updatedByAdmin?.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <Label
                  htmlFor="isActive"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Active
                </Label>
                <Controller
                  name="isActive"
                  control={control}
                  defaultValue={data.isActive}
                  rules={{ required: true }}
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
              </div>
            </div>

            <>
              <Label
                htmlFor="date"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Date
              </Label>
              <Controller
                name="date"
                control={control}
                defaultValue={data.date || ""}
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
            <>
              <Label
                htmlFor="image"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Banner Image
              </Label>
              <Controller
                name="image"
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

                      onChange(file);
                    }}
                  />
                )}
              />
              {coverPreview && (
                <Image
                  src={coverPreview}
                  alt="preview"
                  height={300}
                  width={300}
                />
              )}
              {data.image && (
                <img src={getImageUrl(data.image)} alt={data.channel} />
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
    </form>
  );
};