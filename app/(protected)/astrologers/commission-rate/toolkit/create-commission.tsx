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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCommissionCreate } from "../hook/use-commission-create";
import { AstrologerList } from "@/components/ui-kit/astrologer-list";

type CommissionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateCommission = ({ open, onOpenChange }: CommissionProps) => {
  const { isSubmitting, control, handleSubmit, onFormSubmit } =
    useCommissionCreate(onOpenChange);
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
                  defaultValue={""}
                  rules={{ required: false}}
                  render={({ field: { onChange, value } }) => (
                    <AstrologerList
                      value={value}
                      onChange={onChange}
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
                  defaultValue={0}
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
