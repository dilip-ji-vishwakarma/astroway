"use client";
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
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseGiftMutations } from "../hook/use-gift-mutations";

type GiftProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateGift = ({ open, onOpenChange }: GiftProps) => {
  const { isSubmitting, control, handleSubmit, onSubmit, errors } =
    UseGiftMutations(onOpenChange);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Gift</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <>
                <Label
                  htmlFor="name"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Gift Name"
                      onChange={onChange}
                      value={value ?? ""}
                    />
                  )}
                />
                {errors["name"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Name
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="amount"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Amount
                </Label>
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="number"
                      className="text-black"
                      placeholder="Amount"
                      onChange={onChange}
                      value={value ?? ""}
                    />
                  )}
                />
                {errors["amount"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Amount
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="imageUrl"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Image
                </Label>
                <Controller
                  name="imageUrl"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <Input
                      accept="image/jpeg,image/png,image/webp"
                      type="file"
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
                          onChange(file);
                        }
                      }}
                    />
                  )}
                />
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
