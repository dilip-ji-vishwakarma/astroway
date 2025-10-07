/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDataMutation } from "../hook/use-data-mutations";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { languageOptions } from "@/lib/options";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Address } from "@/components/ui-kit/Address";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";

export const PageBase = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, isSubmitting, setValue } = useDataMutation(id);

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
          <CardTitle>Update Customer Details</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <div className="flex items-center px-6 justify-between">
          <div className="w-[50%]">
            <Label
              htmlFor="isBlocked"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Block Customer
            </Label>
            <Controller
              name={`isBlocked`}
              control={control}
              defaultValue={data.isBlocked}
              render={({ field: { onChange, value } }) => (
                <Switch
                  className="cursor-pointer"
                  checked={value}
                  onCheckedChange={(checked) => {
                    onChange(checked);
                    // handleSwitchChange(item.id, checked);
                  }}
                />
              )}
            />
          </div>
          <div className="w-[50%]">
            <Label
              htmlFor="blockedReason"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Blocked Reason
            </Label>
            <Controller
              name="blockedReason"
              control={control}
              defaultValue={data.blockedReason || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Textarea className="" onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>
        <CardContent className="grid grid-cols-2 gap-6">
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
              defaultValue={data.firstName || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
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
              defaultValue={data.lastName || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
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
              defaultValue={data.email || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  className=""
                  onChange={onChange}
                  value={value}
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
              defaultValue={data.phone || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="tel"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="isPhoneVerified"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Phone Verified
            </Label>
            <Controller
              name="isPhoneVerified"
              control={control}
              defaultValue={data.isPhoneVerified || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                  disabled
                />
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="dateOfBirth"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Birth Date
            </Label>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={data.dateOfBirth || null}
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
          </div>
          <div>
            <Label
              htmlFor="timeOfBirth"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Time Of Birth
            </Label>
            <Controller
              name="timeOfBirth"
              control={control}
              defaultValue={data.timeOfBirth || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="time"
                  className="block"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="placeOfBirth"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Place Of Birth
            </Label>
            <Controller
              name="placeOfBirth"
              control={control}
              defaultValue={data.placeOfBirth || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="gender"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Select Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              defaultValue={data.gender || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Gender --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="languages"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Language
            </Label>
            <Controller
              name="languages"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={languageOptions}
                  defaultValue={
                    Array.isArray(data.languages) ? data.languages : []
                  }
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Language --"
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="referCode"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Refer Code
            </Label>
            <Controller
              name="referCode"
              control={control}
              defaultValue={data.referCode || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="walletBalance"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Wallet Balance
            </Label>
            <Controller
              name="walletBalance"
              control={control}
              defaultValue={data.walletBalance}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) =>
                    onChange(e.target.value ? parseFloat(e.target.value) : null)
                  }
                  value={value}
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
                          <img
                            src={
                              uploadedImageUrl.startsWith("http")
                                ? uploadedImageUrl
                                : `http://testing.nextgendiluents.com/backend-images${uploadedImageUrl}`
                            }
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
          <Address control={control} data={data} />
          <div>
            <Label
              htmlFor="currentAddress"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Current Address
            </Label>
            <Controller
              name="currentAddress"
              control={control}
              defaultValue={data.currentAddress}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
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
