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
import { useUserMutation } from "../hook/use-user-mutations";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NewCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  id: number;
};

export const UpdateCategory = ({
  open,
  onOpenChange,
  name,
  id
}: NewCategoryProps) => {
  const { onFormSubmit, handleSubmit, control, isSubmitting, errors, setValue } =
    useUserMutation(onOpenChange);
  useEffect(() => {
    if (name) {
      setValue("name", name); // react-hook-form ka setValue
    }
  }, [name, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit((data) => onFormSubmit({ ...data, id }))} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <>
                <Label
                  htmlFor="name"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Category Name
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
                    Please Enter Category Name
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="icon"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Icon
                </Label>
                <Controller
                  name="icon"
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