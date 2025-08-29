
import { sign_in_endpoint } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useDataMutation = () => {
  const [message, setMessage] = useState("");

const onSubmit = async (formProp: any) => {
  const result = await signIn("credentials", {
    redirect: false,       // important, don't auto redirect
    user: JSON.stringify(formProp),
  });

  if (result?.error) {
    toast.error(result.error);
    return;
  }

  if (result?.ok) {
    toast.success("Login successful!");
    // you can now redirect
    redirect("/dashboard");
  }
};

  return {message, setMessage, onSubmit};
};
