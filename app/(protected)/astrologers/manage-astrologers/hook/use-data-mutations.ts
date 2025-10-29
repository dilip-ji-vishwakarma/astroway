/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { approved_astrologer, manage_astrologer } from "@/lib/api-endpoints";
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
  const [search, setSearch] = useState("");

  const getData = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
      }).toString();

      const res = await apiServices(`${manage_astrologer}?${query}`, "get");

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
    getData(pagination.page, pagination.limit, search);
  }, [pagination.page, pagination.limit, search]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    getData(newPage, pagination.limit, search);
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    getData(1, newLimit, search);
  };

  const onSubmit = async (formProp: any) => {
    if (!formProp.astrologerId) {
      toast.error("Missing ID");
      return;
    }
    try {
      const response = await apiServices(approved_astrologer, "post", formProp);
      toast.success(response.message);
      window.location.reload();
    } catch (error: any) {
      toast.error("Approval failed", error);
    }
  };

  const handleSwitchChange = async (itemId: string, checked: boolean) => {
    setSubmittingItems((prev) => new Set([...prev, itemId]));

    try {
      await onSubmit({
        astrologerId: itemId,
        isApproved: checked,
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

  return {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    search,
    setSearch,
    submittingItems,
    handleSwitchChange,
  };
};