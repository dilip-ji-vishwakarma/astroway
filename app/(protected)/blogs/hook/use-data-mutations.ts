/* eslint-disable @typescript-eslint/no-explicit-any */

import { blogs } from "@/lib/api-endpoints";
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
          `${blogs}?page=${pageNumber}&limit=${pagination.limit}`,
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

  const handleDelete = async (id: number) => {
  
    try {
        setLoad(id)
      const response = await apiServices(`/blogs/${id}`, "delete");
      if (response?.success === true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
        setLoad(null)
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      setLoad(null)
      throw error;
    }
  }

  return {
    data,
    pagination,
    loading,
    handlePageChange,
    handleDelete,
    load
  };
};
