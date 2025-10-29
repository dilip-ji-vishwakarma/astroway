// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { stories } from "@/lib/api-endpoints";
// import { apiServices } from "@/lib/api.services";
// import { useCallback, useState } from "react";
// import { toast } from "sonner";

// type Pagination = {
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// };

// export const useDataMutations = (
//   initialData: any[],
//   initialPagination: Pagination
// ) => {
//   const [data, setData] = useState<any[]>(initialData);
//   const [pagination, setPagination] = useState<Pagination>(initialPagination);
//   const [loading, setLoading] = useState(false);
//     const [load, setLoad] = useState<number | null>(null);

//   const fetchData = useCallback(
//     async (pageNumber: number) => {
//       try {
//         setLoading(true);

//         const response = await apiServices(
//           `${stories}?page=${pageNumber}&limit=${pagination.limit}`,
//           "get"
//         );

//         if (response.statusCode == 200) {
//           setData(response.data || []);
//           setPagination(response.pagination);
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch astrologers:", error);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [pagination?.limit]
//   );

//   const handlePageChange = (page: number) => {
//     fetchData(page);
//   };

//   const handleDelete = async (id: any) => {
//     try {
//       setLoad(id);
//       const response = await apiServices(`${stories}/${id}`, "delete");
//       if (response.success == true) {
//         toast.success(response.message);
//         window.location.reload();
//       } else {
//         setLoad(null);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch astrologers:", error);
//       setLoad(null);
//     }
//   };

//   return {
//     data,
//     pagination,
//     loading,
//     handlePageChange,
//     load,
//     handleDelete,
//   };
// };


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