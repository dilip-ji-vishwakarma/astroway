/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Category } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";

export const useDataMutation = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingItems, setSubmittingItems] = useState<Set<string>>(
    new Set()
  );
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getData = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        isBlocked: "true",
      }).toString();

      const res = await apiServices(`${Category}?${query}`, "get");

      if (res?.success) {
        setData(res.data || []);
        setPagination({
          page: res.pagination.page,
          limit: res.pagination.limit,
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
        });
      } else {
        toast.error("Failed to fetch data", {
          description: res?.message || "Something went wrong.",
        });
      }
    } catch (err: any) {
      toast.error("Error fetching data", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    getData(newPage, pagination.limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    getData(1, newLimit);
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
        toast.success(response.message);
        setData((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, isActive: checked } : item
          )
        );
      } else {
        toast.error(response.message);
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
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    submittingItems,
    handleSwitchChange,
  };
};