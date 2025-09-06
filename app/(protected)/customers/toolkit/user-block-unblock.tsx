/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "@/components/ui/button";
import { useUserMutation } from "../hook/use-user-mutations";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type EditProfileProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRequest: boolean;
  id: any;
};

export const UserBlockUnblock = ({
  open,
  onOpenChange,
  userRequest,
  id,
}: EditProfileProps) => {
  const { onSubmit, handleSubmit, control, isSubmitting, reset } =
    useUserMutation(id, onOpenChange);

  useEffect(() => {
    reset({ isBlocked: userRequest });
  }, [userRequest, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Block / Unblock User</DialogTitle>
            <DialogDescription className="mt-3">
              <span className="flex justify-between items-center py-2">
                <Label
                  htmlFor="isBlocked"
                  className="text-slate-900 text-sm font-medium block"
                >
                  {userRequest ? "Unblock User" : "Block User"}
                </Label>
                <Controller
                  name="isBlocked"
                  control={control}
                  defaultValue={userRequest}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      className="cursor-pointer"
                      checked={value}
                      onCheckedChange={(checked) => {
                        onChange(checked);
                      }}
                    />
                  )}
                />
              </span>
              <span>
                <Label
                  htmlFor="blockedReason"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  {userRequest ? "Unblock Note" : "Block Reason"}
                </Label>
                <Controller
                  name="blockedReason"
                  control={control}
                  defaultValue={""}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      placeholder="Type Reason..."
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </span>
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