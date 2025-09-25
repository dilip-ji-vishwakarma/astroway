/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { stories } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const useDataMutations = (
  initialData: any[],
  initialPagination: Pagination
) => {
  const [data, setData] = useState<any[]>(initialData);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState<number | null>(null);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${stories}?page=${pageNumber}&limit=${pagination.limit}`,
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

  const handleDelete = async (id: any) => {
    try {
      setLoad(id);
      const response = await apiServices(`${stories}/${id}`, "delete");
      if (response.success == true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        setLoad(null);
      }
    } catch (error) {
      console.error("❌ Failed to fetch astrologers:", error);
      setLoad(null);
    }
  };

  return {
    data,
    pagination,
    loading,
    handlePageChange,
    load,
    handleDelete,
  };
};
