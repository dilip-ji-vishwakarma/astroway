import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useHandleList = () => {
   const {
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
      watch
    } = useForm();


     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const onSubmit = async (formData: any, id: number) => {
        try {
          const response = await apiServices(`/admin/user/${id}`, "put", formData);
          if (response.success == true) {
            toast.success(response.message);
            window.location.reload();
          } else {
            toast.success(response.message);
          }
        } catch (error) {
          console.error("❌ Failed to fetch astrologers:", error);
        }
      };

  return {control, handleSubmit, errors, isSubmitting, onSubmit, watch}
}
