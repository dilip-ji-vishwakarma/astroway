/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
import { useAddList } from "../hook/use-add-list";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import useFilePreview from "@/hooks/use-file-preview";
import { Eye, EyeOff } from "lucide-react";

type AddProps = {
  action: boolean;
  onOpenChange: (open: boolean) => void;
  role: any;
};

export const AddTeam = ({ action, onOpenChange, role }: AddProps) => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    useAddList();
  const [masked, setMasked] = useState(true);
  const selectedFile = watch("avatarUrl") as File | null;
  const previewPreview = useFilePreview(selectedFile);
  return (
    <Dialog open={action} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Role</DialogTitle>
            <DialogDescription>
              Make changes to your role here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-5 space-y-3 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
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
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="Type name"
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
                defaultValue={""}
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
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput onChange={onChange} value={value} />
                )}
              />
              {errors["phone"] && (
                <span className="text-red-500 text-sm">
                  Please Type Mobile Number
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Password
              </Label>
              <div className="relative flex items-center">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type={masked ? "password" : "text"}
                      className=""
                      placeholder="Password"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <Button
                  type="button"
                  className="bg-[transparent] hover:bg-[transparent] w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={() => {
                    setMasked(!masked);
                  }}
                >
                  {masked ? (
                    <EyeOff
                      color="#000000"
                      className=" w-4 h-4 absolute right-[0px] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      color="#000000"
                      className=" w-4 h-4 absolute right-[0px] cursor-pointer"
                    />
                  )}
                </Button>
              </div>
              <div>
                {errors["password"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Password
                  </span>
                )}
              </div>
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
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
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
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {isSubmitting ? "Saving" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
