"use client";
import React, { useEffect } from "react";
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
import useFilePreview from "@/hooks/use-file-preview";
import { Checkbox } from "@/components/ui/checkbox";

export const PageBase = () => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isSubmitting,
    watch,
    errors,
    setValue,
  } = useDataMutations();
  const titleValue = watch("title");
  const coverFile = watch("cover") as File | null;
  const previewFile = watch("preview") as File | null;

  const coverPreview = useFilePreview(coverFile);
  const previewPreview = useFilePreview(previewFile);

  useEffect(() => {
    if (titleValue) {
      setValue(
        "slug",
        titleValue
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
        { shouldValidate: true }
      );
    }
  }, [titleValue, setValue]);

  const tagOptions = ["announcement", "news", "update"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[75%_25%] gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add Post</CardTitle>
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
                defaultValue={""}
                rules={{ required: "Title is required" }}
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
              {errors["title"] && (
                <span className="text-red-500 text-sm ">
                  Please Enter Title
                </span>
              )}
            </>
            <>
              <Controller
                name={`contentHTML`}
                control={control}
                defaultValue={""}
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
                defaultValue={""}
                rules={{ required: "Summary is required" }}
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
              {errors["summary"] && (
                <span className="text-red-500 text-sm ">
                  Please Enter Summary
                </span>
              )}
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
                defaultValue={""}
                rules={{ required: "Slug is required" }}
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
              {errors["slug"] && (
                <span className="text-red-500 text-sm ">Please Enter Slug</span>
              )}
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
                defaultValue={""}
                control={control}
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
                  defaultValue={new Date().toISOString()}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(new Date(value), "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={value ? new Date(value) : new Date()}
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
              </>
              <>
                <Label
                  htmlFor="tags"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Tags
                </Label>
                <Controller
                  name={`tags`}
                  control={control}
                  defaultValue={[]}
                  rules={{ required: "Tags is required" }}
                  render={({ field: { onChange, value } }) => (
                    <div className="space-y-2">
                      {tagOptions.map((tag) => (
                        <label key={tag} className="flex items-center gap-2">
                          <Checkbox
                            checked={value.includes(tag)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, tag]); // add
                              } else {
                                onChange(
                                  value.filter((t: string) => t !== tag)
                                ); // remove
                              }
                            }}
                          />
                          <span>{tag}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors["tags"] && (
                  <span className="text-red-500 text-sm ">
                    Please Select Tags
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

                        onChange(file);
                      }}
                    />
                  )}
                />

                {previewPreview && (
                  <Image
                    src={previewPreview}
                    alt="preview"
                    height={300}
                    width={300}
                  />
                )}
              </>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
};
