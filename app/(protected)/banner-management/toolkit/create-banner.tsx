import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import useFilePreview from "@/hooks/use-file-preview";
import { newBannerMutations } from "../hook/new-banner-mutations";

type CreateBannerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateBanner = ({ open, onOpenChange }: CreateBannerProps) => {
  const { onFormSubmit } = newBannerMutations(onOpenChange);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const previewFile = watch("url") as File | null;
  const previewPreview = useFilePreview(previewFile);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="space-y-5" onSubmit={handleSubmit(onFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <>
                <Label
                  htmlFor="bannerType"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Banner Type
                </Label>
                <Controller
                  name="bannerType"
                  control={control}
                  defaultValue={""}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Banner Type"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors["bannerType"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Banner Type
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="fromDate"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  From Date
                </Label>
                <Controller
                  name="fromDate"
                  control={control}
                  defaultValue={""}
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
                {errors["fromDate"] && (
                  <span className="text-red-500 text-sm ">
                    Please Select Date
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="toDate"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  To Date
                </Label>
                <Controller
                  name="toDate"
                  control={control}
                  defaultValue={""}
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
                {errors["toDate"] && (
                  <span className="text-red-500 text-sm ">
                    Please Select Date
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="url"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Banner Image
                </Label>
                <Controller
                  name="url"
                  control={control}
                  defaultValue={""}
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

                {previewPreview && (
                  <Image
                    src={previewPreview}
                    alt="preview"
                    height={300}
                    width={100}
                  />
                )}
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <div className="grid">
              <Button
                type="submit"
                className="w-[80px] py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
