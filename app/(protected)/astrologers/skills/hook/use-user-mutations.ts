/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skill } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const UseUserMutations = (onOpenChange: any, id: number) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const onFormSubmit = async (formProp: any) => {
    try {
      const response = await apiServices(`${Skill}/${id}`, "put", formProp);
      if (response.success == true) {
        toast.success(response.message);
        onOpenChange(false);
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("UnBlocked failed");
    }
  };

  return { setValue, isSubmitting, control, handleSubmit, onFormSubmit };
};
