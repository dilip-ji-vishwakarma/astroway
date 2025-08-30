/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useDataMutation = () => {
  const [rememberMe, setRememberMe] = useState<string | null>(null);
  const [masked, setMasked] = useState(true)
useEffect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("rememberMe");
    setRememberMe(stored);
  }
}, []);
const onSubmit = async (formProp: any) => {
  const result = await signIn("credentials", {
    redirect: false,
    user: JSON.stringify(formProp),
  });

  if (result?.error) {
    toast.error(result.error);
    return;
  }

  if (result?.ok) {
    toast.success("Login successful!");
    if (formProp.remember) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    redirect("/dashboard");
  }
};

  return {onSubmit, rememberMe, setMasked, masked};
};
