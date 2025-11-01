/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useHandleList } from "../hook/use-handle-list";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import Image from "next/image";
import useFilePreview from "@/hooks/use-file-preview";

type UpdateProps = {
  action: boolean;
  data: any;
  onOpenChange: (open: boolean) => void;
  role: any;
};

export const UpdateTeam = ({
  action,
  data,
  onOpenChange,
  role,
}: UpdateProps) => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    useHandleList();
  const selectedFile = watch("avatarUrl") as File | null;
  const previewPreview = useFilePreview(selectedFile);

  return (
    <Dialog open={action} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit((formData) => onSubmit(formData, data.id))}>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Make changes to your role here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-5 space-y-3">
            <div>
              <Label
                htmlFor="name"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Name
              </Label>
              <Controller
                name="name"
                control={control}
                defaultValue={data?.name || ""}
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
                defaultValue={data?.email || ""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="email"
                    placeholder="Type email"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors["email"] && (
                <span className="text-red-500 text-sm">Please Enter email</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Phone
              </Label>
              <Controller
                name="phone"
                control={control}
                defaultValue={
                  data?.phone?.startsWith("+")
                    ? data?.phone
                    : `+91${data?.phone}`
                }
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput onChange={onChange} value={value} />
                )}
              />
              {errors["email"] && (
                <span className="text-red-500 text-sm">Please Enter email</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="role"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Role
              </Label>
              <Controller
                name="role"
                control={control}
                defaultValue={data?.role || ""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value || data?.role || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {role.map((item: any, index: number) => (
                          <SelectItem key={index} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors["role"] && (
                <span className="text-red-500 text-sm">
                  Please select a role
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="avatarUrl"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Picture
              </Label>
              <Controller
                name="avatarUrl"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Input
                    type="file"
                    accept="image/*"
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
                  height={100}
                  width={100}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isSubmitting ? "Saving" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
