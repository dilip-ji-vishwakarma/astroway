/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { Category } from "@/lib/api-endpoints";
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
            `${Category}?page=${pageNumber}&limit=${pagination.limit}`,
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

const handleSwitchChange = async (itemId: string, checked: boolean) => {
    setSubmittingItems((prev) => new Set([...prev, itemId]));

    try {
      const response = await apiServices(
        `${Category}/${itemId}/status`,
        "patch",                           
        { isActive: checked }         
      );

      if (response.statusCode === 200) {
        toast.success("Status updated successfully");
        setData((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, isActive: checked } : item
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      toast.error("Error updating status");
    } finally {
      setSubmittingItems((prev) => {
        const newSet = new Set(prev);
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
    submittingItems,
  };
};
