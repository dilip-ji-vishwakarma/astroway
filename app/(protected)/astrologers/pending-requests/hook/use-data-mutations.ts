/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { approved_astrologer } from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState, useCallback } from "react";
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
  const [submittingItems, setSubmittingItems] = useState<Set<string>>(
    new Set()
  );
  const [data, setData] = useState<any[]>(initialData);
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const fetchData = useCallback(
        async (pageNumber: number, searchTerm: string = "") => {
          try {
            setLoading(true);
    
            const response = await apiServices(
              `/admin/astrologers?page=${pageNumber}&limit=${pagination.limit}&isApproved=false&search=${searchTerm}`,
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

const onSubmit = async (formProp: any) => {
  if (!formProp.astrologerId) {
    toast.error("Missing ID");
    return;
  }
  try {
    const response = await apiServices(approved_astrologer, "post", formProp);
    toast.success("Approved");
    window.location.reload()
  } catch (error: any) {
    toast.error("Approval failed");
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
    onSubmit,
    pagination,
    handlePageChange,
    submittingItems,
    loading,
    handleSwitchChange,
     setSearch,
  };
};