/* eslint-disable @typescript-eslint/no-explicit-any */
import { manage_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState, useCallback } from "react";

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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pageNumber: number, searchTerm: string) => {
    setLoading(true);
    try {
      const response = await apiServices(
        `${manage_astrologer}?page=${pageNumber}&limit=${limit}&search=${searchTerm}`,
        "get"
      );

      setData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setPage(response.pagination?.page || pageNumber);
    } catch (error) {
      console.error("Failed to fetch astrologers:", error);
      // Set empty data on error to avoid showing stale results
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Always reset to page 1 when search changes
      if (search !== "") {
        fetchData(1, search);
      } else {
        // When search is cleared, fetch page 1 with no search term
        fetchData(1, "");
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [search, fetchData]);

  // Handle page changes (only when not searching)
  useEffect(() => {
    // Only fetch when page changes and we're not in the middle of a search
    if (search === "") {
      fetchData(page, "");
    }
  }, [page, fetchData, search]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Custom search handler to reset page
  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1); // Reset to page 1 when searching
  };


  const onSubmit = async (formProp: any) => {
    alert(JSON.stringify(formProp, null, 2))
    
  };

  return {
    data,
    search,
    setSearch: handleSearch,
    page,
    totalPages,
    loading,
    handlePrev,
    handleNext,
    setPage,
    onSubmit
  };
};