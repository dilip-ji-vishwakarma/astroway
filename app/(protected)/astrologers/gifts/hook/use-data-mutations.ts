/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import {
  approved_astrologer,
  gifts,
  manage_astrologer,
} from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
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
  const [submittingItems, setSubmittingItems] = useState<Set<string>>(
    new Set()
  );

  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  // Fetch data
  const fetchData = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const response = await apiServices(
          `${gifts}?page=${pageNumber}&limit=${pagination.limit}`,
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
    fetchData(page);
  };

  // Handle search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [fetchData]);

  const onSubmit = async (formProp: { giftId: string; isActive: boolean }) => {
    if (!formProp.giftId) {
      toast.error("Missing ID");
      return;
    }

    try {
      const response = await apiServices(
        `${gifts}/${formProp.giftId}/status`,
        "patch",
        formProp
      );
      toast.success(response.message);
      window.location.reload();
    } catch (error: any) {
      toast.error("Update failed");
      console.error("Error in onSubmit:", error);
    }
  };

  const handleSwitchChange = async (itemId: string, checked: boolean) => {
    setSubmittingItems((prev) => new Set([...prev, itemId]));

    try {
      await onSubmit({
        giftId: itemId,
        isActive: checked,
      });
    } catch (error) {
      console.error("Error updating approval status:", error);
    } finally {
      setSubmittingItems((prev) => {
        const newSet = new Set([...prev]);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleDeleteGift = async (id: any) => {
    try {
      setDeletingItemId(id);
      const response = await apiServices(`${gifts}/${id}`, "delete");
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
    submittingItems,
    handleSwitchChange,
    handleDeleteGift,
    deletingItemId,
  };
};
