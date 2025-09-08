/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Category } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export const useDataMutation = (
  initialData: any[],
  initialPagination: { page: number; limit: number; totalPages: number }
) => {
  const [data, setData] = useState<any[]>(initialData);
  const [page, setPage] = useState(initialPagination.page || 1);
  const [limit] = useState(initialPagination.limit || 5);
  const [totalPages, setTotalPages] = useState(
    initialPagination.totalPages || 1
  );
const [deletingId, setDeletingId] = useState<number | null>(null);
  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        const response = await apiServices(
          `${Category}?page=${pageNumber}&limit=${limit}`,
          "get"
        );

        setData(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setPage(response.pagination?.page || pageNumber);
      } catch (error) {
        console.error("Failed to fetch astrologers:", error);
        setData([]);
        setTotalPages(1);
      }
    },
    [limit]
  );

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleDelete = async (id: any) => {
    
  };

  return {
    data,
    page,
    totalPages,
    handlePrev,
    handleNext,
    setPage,
    handleDelete,
    deletingId
  };
};
