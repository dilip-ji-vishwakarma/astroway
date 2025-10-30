/* eslint-disable @typescript-eslint/no-explicit-any */
import { role } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { mainItems } from "@/lib/menuItems";
import { useState } from "react";
import { toast } from "sonner";

export const useDataMutation = (response: any) => {
  const [loading, setLoading] = useState(false);

  // Flatten menu items
  const flattenMenu = (items: any[]) => {
    const flat: any[] = [];
    items.forEach((item) => {
      if (item.children) {
        item.children.forEach((child: any) => {
          flat.push({
            parent: item.title,
            title: child.title,
            url: child.url,
          });
        });
      } else {
        flat.push({
          parent: null,
          title: item.title,
          url: item.url,
        });
      }
    });
    return flat;
  };

  const flatMenu = flattenMenu(mainItems);

  // ✅ Safe permission getter
  const getPermission = (moduleName: string, perm: string) => {
    return !!response?.module?.[moduleName]?.[perm];
  };

  // ✅ Submit permissions to API
  const onSubmitApi = async (formattedPermissions: any) => {
    try {
      setLoading(true);

      // Clean up undefined keys
      Object.keys(formattedPermissions).forEach((module) => {
        if (formattedPermissions[module]?.undefined) {
          delete formattedPermissions[module].undefined;
        }
      });

      const updatedData = {
        ...response,
        module: formattedPermissions,
      };

      const updateResponse = await apiServices(
        `${role}/${response.id}`,
        "put",
        updatedData
      );

      if (updateResponse?.success) {
        toast.success(updateResponse.message);
      } else {
        toast.error(updateResponse.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { flatMenu, getPermission, onSubmitApi, loading };
};
