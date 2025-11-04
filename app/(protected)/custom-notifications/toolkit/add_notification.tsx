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

type NotificationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddNotification = ({ open, onOpenChange }: NotificationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    useAddNotification();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Notification</DialogTitle>
            <DialogDescription>
              Make changes to your role here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

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
