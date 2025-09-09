/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { admin_users, approved_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState, useCallback } from "react";

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

    const fetchData = useCallback(
        async (pageNumber: number, searchTerm: string = "") => {
          try {
            setLoading(true);
    
            const response = await apiServices(
              `${admin_users}?page=${pageNumber}&limit=${pagination.limit}&search=${searchTerm}`,
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
    search,
    pagination,
    handlePageChange,
    loading,
     setSearch,
  };
};