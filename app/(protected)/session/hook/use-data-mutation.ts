/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { astrologer_session } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";

export const useDataMutation = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const getData = async (
    page = 1,
    limit = 10,
    search = "",
    type = "all"
  ) => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        type,
      }).toString();

      const res = await apiServices(`${astrologer_session}?${query}`, "get");

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
    getData(pagination.page, pagination.limit, search, type); 
  }, [pagination.page, pagination.limit, search, type]); 

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    getData(newPage, pagination.limit, search, type); 
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    getData(1, newLimit, search, type); 
  };

  return {
    data,
    loading,
    pagination,
    handlePageChange,
    handleLimitChange,
    search,
    setSearch,
    type,
    setType,
  };
};
