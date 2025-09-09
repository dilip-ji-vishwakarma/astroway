/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { reviews } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useState, useCallback } from "react";
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
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${reviews}?page=${pageNumber}&limit=${pagination.limit}`,
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
    [pagination.limit]
  );

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const handleDelete = async (id: any) => {
    setDeletingId(id);
    try {
      const response = await apiServices(`${reviews}/${id}`, "delete");
      toast.success("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.success("Getting Error");
    }
  };

  return {
    data,
    pagination,
    handlePageChange,
    loading,
    handleDelete,
    deletingId,
  };
};