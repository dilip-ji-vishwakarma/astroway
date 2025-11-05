/* eslint-disable @typescript-eslint/no-explicit-any */
import { settings } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useState } from "react";
import { toast } from "sonner";

export const useDataMutations = ({ response }: any) => {
  const [rows, setRows] = useState(response);
const [loadingRow, setLoadingRow] = useState<number | null>(null)
  // generic function
  const updateField = async (id: number, key: string, value: any) => {
    try {
        setLoadingRow(id)
      const body = { [key]: value };
      const response = await apiServices(`${settings}/${id}`, "put", body);
      if (response.success) {
        toast.success(response.message);
        window.location.reload()
      }
    } catch (error: any) {
      toast.error("Update failed", error);
    } finally {
    setLoadingRow(null)
  }
  };

  const handleChange = (index: number, key: string, value: any) => {
    setRows((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };
  return { handleChange, updateField, rows, loadingRow };
};
