/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutations = (id: any) => {
      const { control, handleSubmit, setValue, formState: { isSubmitting }, } = useForm();
    const onSubmit = async (formProp:any) => {
        try {
      const response = await apiServices(
        `/blogs/${id}`,
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
    }
  return {onSubmit, handleSubmit, control, setValue, isSubmitting}
}
