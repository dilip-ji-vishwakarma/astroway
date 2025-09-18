/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";
import { useState, useCallback } from "react";
import { commision } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const useDataMutation = (
  initialData: any[],
  initialPagination: Pagination
) => {
  const [data, setData] = useState<any[]>(initialData);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${commision}?page=${pageNumber}&limit=${pagination.limit}`,
          "get"
        );

        if (response.statusCode == 200) {
          setData(response.data || []);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("❌ Failed to fetch astrologers:", error);
      } finally {
        setLoading(false);
      }
    },
    [pagination?.limit]
  );

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const handleDeleteCommission = async (id: any) => {
    try {
      setDeletingItemId(id);
      const response = await apiServices(`${commision}/${id}`, "delete");
      if (response.success === true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message || "Delete failed");
      }
    } catch (error: any) {
      toast.error("Failed to delete skill");
    } finally {
      setDeletingItemId(null);
    }
  };

  return {
    data,
    pagination,
    loading,
    fetchData,
    handlePageChange,
    handleDeleteCommission,
    deletingItemId,
  };
};
