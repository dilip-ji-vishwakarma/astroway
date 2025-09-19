/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutations = (id: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (formProp: any) => {
     const formData = new FormData();
    formData.append("title", formProp.title);
    formData.append("contentHTML", formProp.contentHTML);
    formData.append("summary", formProp.summary);
    formData.append("publish_by", formProp.publish_by);
    formData.append("publishedAt", formProp.publishedAt);
    formData.append("preview", formProp.previewImage);
    formData.append("cover", formProp.coverImage);
    try {
      const response = await apiServices(`/blogs/${id}`, "put", formData);

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
  return { onSubmit, handleSubmit, control, setValue, isSubmitting };
};
