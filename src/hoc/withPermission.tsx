"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/src/context/PermissionContext";

export function withPermission(moduleName: string) {
  return function <P extends object>(Component: React.ComponentType<P>) {
    return function ProtectedPage(props: P) {
      const { modules, role } = usePermission();
      const router = useRouter();

      const canView = role === "superadmin" || modules?.[moduleName]?.view;

      useEffect(() => {
        if (!canView) router.replace("/unauthorized");
      }, [canView, router]);

      if (!canView) return null;

      return <Component {...props} />;
    };
  };
}
