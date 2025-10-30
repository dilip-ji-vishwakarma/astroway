/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { stories} from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";

export const useDataMutation = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState<number | null>(null);
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
      }).toString();

      const res = await apiServices(`${stories}?${query}`, "get");

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
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleDelete,
    load
  };
};