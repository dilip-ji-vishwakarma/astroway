/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUserMutation = (onOpenChange: any) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (formProp: any) => {
  try {
    const formData = new FormData();
    formData.append("name", formProp.name);
    formData.append("icon", formProp.icon);

    const response = await apiServices(Category, "post", formData);

    if (response?.statusCode === 201) {
      toast.success("Category Added Successfully");
      onOpenChange(false);
    } else {
      toast.error(response?.message || "Category Not Added");
    }
  } catch (error: unknown) {
    toast.error(error instanceof Error ? error.message : String(error));
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