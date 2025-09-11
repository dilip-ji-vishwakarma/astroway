/* eslint-disable @typescript-eslint/no-explicit-any */

import { astrologer_details } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutation = (id: any) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formProp: any) => {
    try {
      const formData = new FormData();
      Object.entries(formProp).forEach(([key, value]) => {
        formData.append(key, value as any);
      });

      const response = await apiServices(
        `${astrologer_details}/update/${id}`,
        "put",
        formData // send FormData instead of JSON
      );

      if (response?.success === true) {
        toast.success("Updated successfully");
        return response;
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      throw error;
    }
  };

  return { onSubmit, handleSubmit, control, errors, isSubmitting, reset };
};
