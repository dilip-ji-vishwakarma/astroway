import { admin_user } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useAddNotification = () => {
   const {
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
      watch
    } = useForm();


     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const onSubmit = async (formData: any) => {
  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    const response = await apiServices(admin_user, "post", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.success === true) {
      toast.success(response.message);
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error("❌ Failed to update user:", error);
    toast.error("Something went wrong!");
  }
};


  return {control, handleSubmit, errors, isSubmitting, onSubmit, watch}
}
