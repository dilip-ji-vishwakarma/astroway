/* eslint-disable @typescript-eslint/no-explicit-any */
import { role } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type UpdatePayload = {
  id: number;
  name: string;
  module: Record<string, any>;
}

export const useDataMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { role_id } = useParams();

  const mutate = async (payload: UpdatePayload) => {
    try {
      setIsLoading(true);
      const res = await apiServices(`${role}/${role_id}`, "put", payload);
      if (res.success) {
        toast.success("Updated");
      } else {
        throw new Error("Failed to update permissions");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
};
