/* eslint-disable @typescript-eslint/no-explicit-any */
import { role } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutation = () => {
    const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: any, permissions: any) => {
    const payload = {
      name: data.name,
      module: permissions,
    };

    try {
      const res = await apiServices(role, "post", payload);
      if (res.success) {
        toast.success("Created");
        router.push("/team-management/team-role");
      } else {
        throw new Error("Failed to update permissions");
      }
      reset();
    } catch (err) {
      console.error("❌ Error creating role:", err);
    }
  };

  return { control, handleSubmit, errors, isSubmitting, onSubmit };
};
