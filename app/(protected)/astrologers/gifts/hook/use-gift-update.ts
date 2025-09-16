/* eslint-disable @typescript-eslint/no-explicit-any */
import { gifts } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useGiftUpdate = (onOpenChange: any, id: number) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onFormSubmit = async (formProp: any) => {
    try {
      const formData = new FormData();
      formData.append("name", formProp.name);
      formData.append("amount", formProp.amount);
      formData.append("imageUrl", formProp.imageUrl);

      const response = await apiServices(`${gifts}/${id}`, "put", formData);

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
