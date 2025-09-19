/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";
import Editor from "react-simple-wysiwyg";

export const PageBase = ({ initialData }: any) => {
  const { onSubmit, handleSubmit, control, setValue, isSubmitting } =
    useDataMutations(initialData.id);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    initialData.coverImage || ""
  );

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiServices(
        "/file/upload/astrologer",
        "post",
        formData
      );

      if (response.success === true) {
        setUploadedImageUrl(response.data.file);
        setValue("avatarUrl", response.data.file);
        toast.success(response.message);
      } else {
        alert("File upload failed: " + response.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
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
              <>
                <Label
                  htmlFor="isDraft"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Status
                </Label>
                <Controller
                  name="isDraft"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(val) => onChange(val === "draft")}
                      value={value ? "publish" : "draft"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Select Status --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-black" value="draft">
                          Draft
                        </SelectItem>
                        <SelectItem className="text-black" value="publish">
                          Publish
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </>
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
              </>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label
                  htmlFor="coverImage"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Profile Image
                </Label>

                {/* Hidden input to store the image URL */}
                <Controller
                  name="coverImage"
                  control={control}
                  defaultValue={initialData.coverImage || ""}
                  render={({ field: { value } }) => (
                    <Input type="hidden" value={value} />
                  )}
                />

                {/* File input for uploading */}
                <Input
                  accept="image/jpeg,image/png,image/webp"
                  type="file"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const allowedTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                      ];
                      if (!allowedTypes.includes(file.type)) {
                        alert("Only JPG, PNG, and WEBP files are allowed.");
                        return;
                      }
                      handleFileUpload(file);
                    }
                  }}
                />

                {isUploading && (
                  <div className="mt-2 text-blue-600 text-sm">
                    Uploading image...
                  </div>
                )}

                {uploadedImageUrl && (
                  <div className="mt-2">
                    <img
                      src={
                        uploadedImageUrl.startsWith("http")
                          ? uploadedImageUrl
                          : `https://astrova-backend-t1zo.onrender.com${uploadedImageUrl}`
                      }
                      alt="Preview"
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
    </>
  );
};
