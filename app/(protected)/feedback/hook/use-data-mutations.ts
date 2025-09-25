/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { feedback } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useCallback, useState } from "react";

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

  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${feedback}?page=${pageNumber}&limit=${pagination.limit}`,
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


  return {
    data,
    pagination,
    loading,
    handlePageChange,
  };
};
