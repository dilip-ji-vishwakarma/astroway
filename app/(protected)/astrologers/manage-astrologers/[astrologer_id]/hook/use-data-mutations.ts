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
    setValue ,
    formState: { errors, isSubmitting },
  } = useForm();

  

  const onSubmit = async (formProp: any) => {
    try {
      const response = await apiServices(
        `${astrologer_details}/update/${id}`,
        "put",
        formProp 
      );

      if (response?.success === true) {
        toast.success(response.message);
        window.location.reload();
        return response;
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      throw error;
    }
  };

  return { onSubmit, handleSubmit, control, errors, isSubmitting, reset, setValue  };
};
