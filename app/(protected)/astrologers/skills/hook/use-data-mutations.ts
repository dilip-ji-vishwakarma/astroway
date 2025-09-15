/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {  Skill } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useState, useCallback } from "react";
import { toast } from "sonner";

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
   const [submittingItems, setSubmittingItems] = useState<Set<string>>(
        new Set()
      );

  const fetchData = useCallback(
      async (pageNumber: number) => {
        try {
          setLoading(true);
  
          const response = await apiServices(
            `${Skill}?page=${pageNumber}&limit=${pagination.limit}`,
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

  const onSubmit = async (itemId: string, formProp: any) => {
  try {
    const response = await apiServices(
      `${Skill}/${itemId}/status`,
      "patch",
      formProp
    );
    if(response.success) {
    toast.success(response.message);
    window.location.reload();
    }
  } catch (error: any) {
    toast.error("UnBlocked failed");
  }
};

const handleSwitchChange = async (itemId: string, checked: boolean) => {
  // Add item to submitting state
  setSubmittingItems((prev) => new Set([...prev, itemId]));

  try {
    await onSubmit(itemId, {
      isActive: checked,
    });
  } catch (error) {
    console.error("Error updating approval status:", error);
  } finally {
    // Remove item from submitting state
    setSubmittingItems((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(itemId);
      return newSet;
    });
  }
};



  return {
   data,
    pagination,
    handlePageChange,
    loading,
    handleSwitchChange,
    submittingItems
  };
};
