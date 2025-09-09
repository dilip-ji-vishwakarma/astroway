/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { manage_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const useDataMutation = (
  initialData: any[],
  initialPagination: Pagination
) => {
  const [data, setData] = useState<any[]>(initialData);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch data
  const fetchData = useCallback(
    async (pageNumber: number, searchTerm: string = "") => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${manage_astrologer}?page=${pageNumber}&limit=${pagination.limit}&search=${searchTerm}`,
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

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchData(page, search);
  };

  // Handle search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(1, search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, fetchData]);

  return {
    data,
    pagination,
    loading,
    fetchData,
    handlePageChange,
    setSearch,
    search,
  };
};