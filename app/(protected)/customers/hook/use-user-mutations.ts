/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { block_user } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUserMutation = (
  id: any[],
  onOpenChange: (open: boolean) => void
) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (formProp: any) => {
    const payload = {
      userId: id,
      isBlocked: formProp.isBlocked,
      blockedReason: formProp.blockedReason,
    };
    try {
      const response = await apiServices(block_user, "patch", payload);
      if (response.statusCode == 200) {
        onOpenChange(false);
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("Form not submitted");
    }
  };

  return {
    onSubmit,
    handleSubmit,
    control,
    reset,
    errors,
    isSubmitting,
  };
};
