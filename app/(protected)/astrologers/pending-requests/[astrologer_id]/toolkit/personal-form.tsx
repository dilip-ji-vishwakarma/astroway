/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDataMutation } from "../hook/use-data-mutations";
import { Controller } from "react-hook-form";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";
import Image from "next/image";

export const PersonalForm = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, errors, isSubmitting, setValue } =
    useDataMutation(id);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    data.avatarUrl || ""
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              First Name
            </Label>
            <Controller
              name="firstName"
              control={control}
              defaultValue={data.firstName}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  placeholder="First Name"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors["firstName"] && (
              <span className="text-red-500 text-sm ">
                Please Enter Your Email
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Last Name
            </Label>
            <Controller
              name="lastName"
              control={control}
              defaultValue={data.lastName}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  placeholder="Last Name"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors["lastName"] && (
              <span className="text-red-500 text-sm ">
                Please Enter Your Email
              </span>
            )}
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              defaultValue={data.email}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  className=""
                  placeholder="Email"
                  onChange={onChange}
                  value={value}
                  disabled
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Phone
            </Label>
            <Controller
              name="phone"
              control={control}
              defaultValue={data.phone}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="phone"
                  className=""
                  placeholder="Phone"
                  onChange={onChange}
                  value={value}
                  disabled
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="avatarUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Profile Image
            </Label>

            {/* Hidden input to store the image URL */}
            <Controller
              name="avatarUrl"
              control={control}
              defaultValue={data.avatarUrl || ""}
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
                <Image
                  src={
                    uploadedImageUrl.startsWith("http")
                      ? uploadedImageUrl
                      : `http://testing.nextgendiluents.com/backend-images${uploadedImageUrl}`
                  }
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md"
                  width={150}
                  height={150}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-[150px] py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
            ) : (
              <span>Update</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};