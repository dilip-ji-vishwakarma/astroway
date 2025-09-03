/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { toggle_blocked_unblocked_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export const useDataMutation = (
  initialData: any[],
  initialPagination: { page: number; limit: number; totalPages: number }
) => {
      const [submittingItems, setSubmittingItems] = useState<Set<string>>(
    new Set()
  );
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
        `/admin/astrologers?page=${pageNumber}&limit=${limit}&isBlocked=true`,
        "get"
      );

      setData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setPage(response.pagination?.page || pageNumber);
    } catch (error) {
      console.error("Failed to fetch astrologers:", error);
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
  if (!formProp.astrologerId) {
    toast.error("Missing ID");
    return;
  }
  try {
    const response = await apiServices(toggle_blocked_unblocked_astrologer, "post", formProp);
    toast.success("UnBlocked");
    fetchData(page, search); 
  } catch (error: any) {
    toast.error("UnBlocked failed");
  }
};



  const handleSwitchChange = async (itemId: string, checked: boolean) => {
    // Add item to submitting state
    setSubmittingItems((prev) => new Set([...prev, itemId]));

    try {
      await onSubmit({
        astrologerId: itemId,
        isApproved: checked,
      });
    } catch (error) {
      console.error("Error updating approval status:", error);
      // You might want to show an error message to the user here
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
    search,
    setSearch: handleSearch,
    page,
    totalPages,
    loading,
    handlePrev,
    handleNext,
    setPage,
    onSubmit,
    submittingItems,
    handleSwitchChange
  };
};