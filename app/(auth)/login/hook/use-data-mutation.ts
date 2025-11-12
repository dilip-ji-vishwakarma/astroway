"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiServices } from "@/lib/api.services";
import { mainItems } from "@/lib/menuItems";
import { signIn, getSession } from "next-auth/react"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useDataMutation = () => {
  const [rememberMe, setRememberMe] = useState<string | null>(null);
  const [masked, setMasked] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("rememberMe");
    setRememberMe(stored);
  }, []);

  const getFirstRoute = (modules: any) => {
    const firstAllowedModuleName = Object.keys(modules).find(
      key => modules[key]?.view === true
    );

    if (!firstAllowedModuleName) return "/dashboard";

    for (const item of mainItems) {
      if (item.title === firstAllowedModuleName) return item.url;
      if (item.children) {
        const child = item.children.find(c => c.title === firstAllowedModuleName);
        if (child) return child.url;
      }
    }

    return "/dashboard";
  };

  const onSubmit = async (formProp: any) => {
    const result = await signIn("credentials", {
      redirect: false,
      user: JSON.stringify(formProp),
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful!");

    if (formProp.remember) localStorage.setItem("rememberMe", "true");
    else localStorage.removeItem("rememberMe");

    // NOW GET UPDATED SESSION
    const session = await getSession(); 
    const role = session?.user.role;

    if (role === "superadmin") {
       window.location.href = "/dashboard";
    }

    const res = await apiServices(`/admin/role?name=${role}`, "get");
    const modules = res?.data?.[0]?.module || {};

    const firstRoute = getFirstRoute(modules);
    window.location.href = firstRoute;
  };

  return { onSubmit, rememberMe, setMasked, masked };
};
