"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useDataMutation } from "./hook/use-data-mutation";
import { Eye, EyeOff } from "lucide-react";

type EditProfileProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChangePassword = ({ open, onOpenChange }: EditProfileProps) => {
  const [oldmasked, setOldMasked] = useState(true);
  const [newmasked, setNewMasked] = useState(true);
  const { onFormSubmit, handleSubmit, control, isSubmitting, errors } =
    useDataMutation(onOpenChange);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <SheetHeader>
            <SheetTitle>Update Password</SheetTitle>
            <SheetDescription className="space-y-5">
              <>
                <Label
                  htmlFor="old_password"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Old Password
                </Label>
                <span className="relative flex items-center">
                  <Controller
                    name="old_password"
                    control={control}
                    rules={{ required: false}}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type={oldmasked ? "password" : "text"}
                        className="text-black"
                        placeholder="Old Password"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    className="bg-[transparent] hover:bg-[transparent] w-4 h-4 absolute right-4 cursor-pointer"
                    onClick={() => {
                      setOldMasked(!oldmasked);
                    }}
                  >
                    {oldmasked ? (
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
                </span>
                {errors["old_password"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Old Password
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="new_password"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  New Password
                </Label>
                <span className="relative flex items-center">
                  <Controller
                    name="new_password"
                    control={control}
                    rules={{ required: false}}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type={newmasked ? "password" : "text"}
                        className="text-black"
                        placeholder="New Password"
                        onChange={onChange}
                        value={value ?? ""}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    className="bg-[transparent] hover:bg-[transparent] w-4 h-4 absolute right-4 cursor-pointer"
                    onClick={() => {
                      setNewMasked(!newmasked);
                    }}
                  >
                    {newmasked ? (
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
                </span>
                {errors["new_password"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter New Password
                  </span>
                )}
              </>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="absolute bottom-0 w-full">
            <Button
              type="submit"
              className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
              ) : (
                <span>Update</span>
              )}
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChangePassword;