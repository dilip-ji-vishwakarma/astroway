/* eslint-disable @typescript-eslint/no-explicit-any */
import { banner } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";

export const newBannerMutations = (onOpenChange: any) => {
  const onFormSubmit = async (formProp: any) => {
    try {
      const formData = new FormData();
      for (const key in formProp) {
        if (formProp.hasOwnProperty(key)) {
          formData.append(key, formProp[key]);
        }
      }
      const response = await apiServices(banner, "post", formData);
      if (response.success) {
        toast.success(response.message);
        onOpenChange(false);
        window.location.reload();
      } else {
        toast.error(response?.message || "Category Not Added");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return { onFormSubmit };
};