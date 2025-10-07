import React, { useEffect } from "react";
import { UseUserMutations } from "../hook/use-user-mutations";
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

type NewCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  id: number;
};

export const UpdateSkill = ({
  open,
  onOpenChange,
  name,
  id,
}: NewCategoryProps) => {
  const { setValue, isSubmitting, control, handleSubmit, onFormSubmit} = UseUserMutations(onOpenChange, id);
  useEffect(() => {
    if (name) {
      setValue("name", name);
    }
  }, [name, setValue]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="space-y-5" onSubmit={handleSubmit(onFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <Label
                htmlFor="name"
                className="text-slate-900 text-sm font-medium mb-2 block"
              >
                Skill Name
              </Label>
              <Controller
                name="name"
                control={control}
                defaultValue={name}
                rules={{ required: false}}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    className="text-black"
                    placeholder="Skill Name"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
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
