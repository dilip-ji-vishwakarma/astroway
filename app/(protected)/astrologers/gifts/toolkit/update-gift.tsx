import React, { useEffect } from "react";
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
import { useGiftUpdate } from "../hook/use-gift-update";

type UpdateGiftProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  id: number;
  amount: number;
};

export const UpdateGift = ({
  open,
  onOpenChange,
  name,
  id,
  amount,
}: UpdateGiftProps) => {
  const {
    handleSubmit,
    onFormSubmit,
    control,
    isSubmitting,
    errors,
    setValue,
  } = useGiftUpdate(onOpenChange, id);

  useEffect(() => {
    if (open) {
      setValue("name", name);
      setValue("amount", amount);
    }
  }, [open, name, amount, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Update Gift</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <>
                <Label
                  htmlFor="name"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Gift Name
                </Label>
                <Controller
                  name="name"
                  defaultValue={name}
                  control={control}
                  rules={{ required: false}}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Category Name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors["name"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Gift Name
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
                  defaultValue={amount}
                  rules={{ required: false}}
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