/* eslint-disable @typescript-eslint/no-explicit-any */
import { manage_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useDataMutation = (
  initialData: any[],
  initialPagination: { page: number; limit: number; totalPages: number; total?: number }
) => {
  const [data, setData] = useState<any[]>(initialData);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage =
    Number(searchParams.get("page")) || initialPagination.page || 1;
  const [limit, setLimit] = useState(initialPagination.limit || 10);
  const [totalPages, setTotalPages] = useState(initialPagination.totalPages || 1);
  const [total, setTotal] = useState(initialPagination.total || 0);

  // ✅ Build query string with updated params
  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value);
        else newParams.delete(key);
      });
      return newParams.toString();
    },
    [searchParams]
  );

  // ✅ Fetch data
  const fetchData = useCallback(
    async (pageNumber: number, searchTerm: string, perPage: number = limit) => {
      setLoading(true);
      try {
        const response = await apiServices(
          `${manage_astrologer}?page=${pageNumber}&limit=${perPage}&search=${searchTerm}`,
          "get"
        );

        setData(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotal(response.pagination?.total || 0);
      } catch (error) {
        console.error("Failed to fetch astrologers:", error);
        setData([]);
        setTotalPages(1);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // ✅ Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(1, search, limit);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, fetchData, limit]);

  // ✅ Fetch when page changes
  useEffect(() => {
    if (search === "") {
      fetchData(currentPage, "", limit);
    }
  }, [currentPage, fetchData, search, limit]);

  // ✅ Pagination handlers
  const onPageChange = (newPage: number) => {
    router.replace(`${pathname}?${createQueryString({ page: String(newPage) })}`);
    fetchData(newPage, search, limit);
  };

  const onPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    router.replace(`${pathname}?${createQueryString({ page: "1" })}`);
    fetchData(1, search, newLimit);
  };

  return {
    data,
    search,
    setSearch,
    page: currentPage,
    totalPages,
    total,
    limit,
    loading,
    onPageChange,
    onPerPageChange,
  };
};
