/* eslint-disable  @typescript-eslint/no-explicit-any */
import { news } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useDataMutations = (data: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await apiServices(`${news}/${data.id}`, "delete");
      if (response?.success === true) {
        setLoading(false);
        toast.success(response.message);
        router.push(`/news`);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      setLoading(false);
      throw error;
    }
  };


  const onSubmit = async (formProp: any) => {
  const formData = new FormData();
  Object.keys(formProp).forEach((key) => {
    formData.append(key, formProp[key]);
  });

  try {
    const response = await apiServices(`${news}/${data.id}`, "put", formData);

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


  return { onSubmit, loading, handleDelete };
};