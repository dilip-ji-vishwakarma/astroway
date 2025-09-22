/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "sonner";

export const useDataMutations = () => {
    const router = useRouter();
    const {handleSubmit, control, watch,
    formState: {errors, isSubmitting }, setValue} = useForm()
   const onSubmit = async (formProp: any) => {
  const formData = new FormData();

  for (const key in formProp) {
    if (formProp[key] !== undefined && formProp[key] !== null) {
      formData.append(key, formProp[key]);
    }
  }

  try {
    const response = await apiServices("/blogs", "post", formData);

    if (response?.success === true) {
      toast.success(response.message);
      router.push("/blogs");
      return response;
    } else {
      toast.error(response.message);
    }
  } catch (error: any) {
    toast.error(error?.message || "Something went wrong");
    throw error;
  }
};

  return {onSubmit, handleSubmit, control, isSubmitting, watch, errors, setValue}
}
