/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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
import { Skill } from "@/lib/api-endpoints";
import { toast } from "sonner";

type DeleteSkillProps = {
  openAlert: boolean;
  onOpenChange: (openAlert: boolean) => void;
  id: number;
};

export const DeleteSkill = ({
  openAlert,
  onOpenChange,
  id,
}: DeleteSkillProps) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiServices(`${Skill}/${id}`, "delete");
      if (response.success) {
        toast.success(response.message);
        onOpenChange(false); // close dialog only on success
        window.location.reload();
      } else {
        toast.error(response.message || "Delete failed");
      }
    } catch (error: any) {
      toast.error("Failed to delete skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={openAlert} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            skill and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}  className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(id)}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? (
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