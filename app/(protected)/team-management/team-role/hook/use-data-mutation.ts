import { role } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useState } from "react";
import { toast } from "sonner";

export const useDataMutation = () => {
   const [deleteId, setDeleteId] = useState<number | null>(null);
  const handleDelete = async (id: number) => {
    try {
      setDeleteId(id)
      const res = await apiServices(`${role}s/${id}`, "delete");
      if (res.success) {
        toast.success(res.message);
        setDeleteId(null)
        window.location.reload()
      } else {
        setDeleteId(null)
        throw new Error("Failed to update permissions");
      }
    } catch (err) {
      console.error("❌ Error creating role:", err);
    }
  };
  return {
    handleDelete,
    deleteId
  };
};
