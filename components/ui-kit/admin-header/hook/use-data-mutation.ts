/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { admin_chnage_password } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDataMutation = (onOpenChange: any) => {
  const { data: session } = useSession();
  const adminId = session?.user?.id;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formProp: any) => {
    console.log("Submitting...", formProp);
    alert(JSON.stringify(formProp, null, 2));
  };

  const onFormSubmit = async (data: any) => {
    const payload = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
      adminId: adminId,
    };

    try {
      const response = await apiServices(admin_chnage_password, "put", payload);
      if (response?.statusCode === 200) {
        toast.success("Password Changed Successfully");
        onOpenChange(false);
        signOut({ callbackUrl: "/login" });
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("Something went wrong while updating password");
    } finally {
      reset();
    }
  };

  return {
    onSubmit,
    onFormSubmit,
    handleSubmit,
    control,
    isSubmitting,
    errors,
  };
};
