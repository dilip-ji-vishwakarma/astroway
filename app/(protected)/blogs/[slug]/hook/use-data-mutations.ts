/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutations = (id: any, initialData:any) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const initialValues = useRef(initialData);
  const onSubmit = async (formProp: any) => {
    const formData = new FormData();

    // Only append fields that changed
    Object.keys(formProp).forEach((key) => {
      if (formProp[key] !== initialValues.current[key]) {
        formData.append(key, formProp[key]);
      }
    });

    // If nothing changed, don't call API
    if (formData.has("title") === false && formData.entries().next().done) {
      toast.info("No changes to save");
      return;
    }

    try {
      const response = await apiServices(`/blogs/${id}`, "put", formData);

      if (response?.success === true) {
        toast.success(response.message);

        // Navigate if slug changed
        if (
          formProp.slug &&
          formProp.slug !== window.location.pathname.split("/").pop()
        ) {
          router.push(`/blogs/${formProp.slug}`);
        } else {
          window.location.reload();
        }
        return response;
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      throw error;
    }
  };
  return { onSubmit, handleSubmit, control, setValue, isSubmitting, watch };
};
