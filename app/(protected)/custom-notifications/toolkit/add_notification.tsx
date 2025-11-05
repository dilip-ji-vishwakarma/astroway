/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useAddNotification } from "../hook/use-add-notification";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFilePreview from "@/hooks/use-file-preview";
import Image from "next/image";
import { MultiSelect } from "@/components/ui/multi-select";

type NotificationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddNotification = ({ open, onOpenChange }: NotificationProps) => {
  const { control, handleSubmit, errors, isSubmitting, onSubmit, watch, type, users, astrologers } =
    useAddNotification();

  const selectedFile = watch("imageUrl") as File | null;
  const previewPreview = useFilePreview(selectedFile);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Notification</DialogTitle>
            <DialogDescription>
              Make changes to your role here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-5 space-y-3">
            <div>
              <Label
                htmlFor="title"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Title
              </Label>
              <Controller
                name="title"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="Type title"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors["title"] && (
                <span className="text-red-500 text-sm">Please Enter title</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="message"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Message
              </Label>
              <Controller
                name="message"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    placeholder="Type email"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors["message"] && (
                <span className="text-red-500 text-sm">
                  Please Enter message
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="type"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Type
              </Label>
              <Controller
                name="type"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {type.map((item: any, index: number) => (
                          <SelectItem key={index} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors["type"] && (
                <span className="text-red-500 text-sm">
                  Please select a type
                </span>
              )}
            </div>
            <div className="w-full">
              <Label
                htmlFor="selectedUsers"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Select Users
              </Label>
              <Controller
                name="selectedUsers"
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={users}
                    value={value}
                    onValueChange={onChange}
                    placeholder="-- Select Categories --"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="selectedUsers"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Select Astrologers
              </Label>
              <Controller
                name="selectedUsers"
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={astrologers}
                    value={value}
                    onValueChange={onChange}
                    placeholder="-- Select Categories --"
                  />
                )}
              />
            </div>
            <div>
              <Label
                htmlFor="imageUrl"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Picture
              </Label>
              <Controller
                name="imageUrl"
                control={control}
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
