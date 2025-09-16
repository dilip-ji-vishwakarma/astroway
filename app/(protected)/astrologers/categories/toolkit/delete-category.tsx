/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";
import { Category } from "@/lib/api-endpoints";

type DeleteSkillProps = {
  openAlert: boolean;
  onOpenChange: (openAlert: boolean) => void;
  id: number;
};

export const DeleteCategory = ({
  openAlert,
  onOpenChange,
  id,
}: DeleteSkillProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await apiServices(`${Category}/${id}`, "delete");
        if (response.success === true) {
          toast.success(response.message);
          onOpenChange(false);
          window.location.reload();
        } else {
          toast.error(response.message || "Delete failed");
        }
      } catch (error: any) {
        toast.error("Failed to delete category");
      }
    });
  };

  return (
    <AlertDialog open={openAlert} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            category and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
            {isPending ? (
              <span className="w-[20px] h-[20px] animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></span>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
