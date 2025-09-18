/* eslint-disable @typescript-eslint/no-explicit-any */
import { commision } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCommissionUpdate = (onOpenChange: any, id: number) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onFormSubmit = async (formProp: any) => {
    try {
      const response = await apiServices(`${commision}/${id}`, "put", formProp);

      if (response.success === true) {
        toast.success(response.message);
        onOpenChange(false);
        window.location.reload();
      } else {
        toast.error(response?.message || "Gift Not Added");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    handleSubmit,
    onFormSubmit,
    control,
    isSubmitting,
    errors,
    setValue,
  };
};
