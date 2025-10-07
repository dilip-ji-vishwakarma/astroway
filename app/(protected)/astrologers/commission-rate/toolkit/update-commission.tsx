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
import { useCommissionUpdate } from "../hook/use-commission-update";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AstrologerList } from "@/components/ui-kit/astrologer-list";

type UpdateCommissionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  id: number;
  percent: number;
  astrologer: any;
};

export const UpdateCommission = ({
  open,
  onOpenChange,
  type,
  id,
  percent,
  astrologer,
}: UpdateCommissionProps) => {
  const { handleSubmit, onFormSubmit, control, isSubmitting, setValue } =
    useCommissionUpdate(onOpenChange, id);

  useEffect(() => {
    if (open) {
      if (type) {
        setValue("type", type);
      }
      if (percent) {
        setValue("percent", percent);
      }
    }
  }, [open, type, percent, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Update Commission</DialogTitle>
            <DialogDescription className="mt-3 space-y-3">
              <>
                <Label
                  htmlFor="type"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Commission Type
                </Label>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={type || ""}
                  rules={{ required: false}}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Select Commission Type --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-black" value="chat">
                          Chat
                        </SelectItem>
                        <SelectItem className="text-black" value="voice">
                          Voice
                        </SelectItem>
                        <SelectItem className="text-black" value="report">
                          Report
                        </SelectItem>
                        <SelectItem className="text-black" value="video">
                          Video
                        </SelectItem>
                        <SelectItem className="text-black" value="gift">
                          Gift
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </>
              <>
                <Label
                  htmlFor="astrologer"
                  className="text-slate-900 text-sm font-medium block"
                >
                  Astrologer
                </Label>
                <Controller
                  name="astrologerId"
                  control={control}
                  defaultValue={
                    astrologer?.id || astrologer?.astrologerId || ""
                  }
                  rules={{ required: false}}
                  render={({ field: { onChange, value } }) => (
                    <AstrologerList
                      value={value}
                      onChange={onChange}
                      selectedAstrologer={astrologer}
                      placeholder="Select Astrologer"
                    />
                  )}
                />
              </>
              <>
                <Label
                  htmlFor="percent"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Commission(%)
                </Label>
                <Controller
                  name="percent"
                  control={control}
                  defaultValue={percent || 0}
                  rules={{ required: false}}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="number"
                      className=""
                      onChange={(e) =>
                        onChange(
                          e.target.value ? parseFloat(e.target.value) : null
                        )
                      }
                      value={value}
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
