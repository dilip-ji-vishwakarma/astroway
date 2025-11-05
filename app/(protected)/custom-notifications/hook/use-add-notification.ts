/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  admin_users,
  manage_astrologer,
  notification,
} from "@/lib/api-endpoints";
import { apiServices } from "@/lib/api.services";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const type = [
  {
    value: "all",
    name: "All",
  },
  {
    value: "all_users",
    name: "All Users",
  },
  {
    value: "all_astrologers",
    name: "All Astrologers",
  },
  {
    value: "specific_users",
    name: "Specific Users",
  },
  {
    value: "specific_astrologers",
    name: "Specific Astrologers",
  },
];

type MultiSelectOption = {
  label: string;
  value: string;
};

export const useAddNotification = () => {
  const [users, setUsers] = useState<MultiSelectOption[]>([]);
  const [astrologers, setAstrologers] = useState<MultiSelectOption[]>([]);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      if (formData.selectedUsers) {
        formData.selectedUsers = formData.selectedUsers
          .split(",")
          .map((v: string) => v.trim());
      }
      const data = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
      const response = await apiServices(notification, "post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success === true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("❌ Failed to update user:", error);
      toast.error("Something went wrong!");
    }
  };

  const fetchAstrologers = async () => {
    try {
      const res = await apiServices(manage_astrologer, "get");
      const mapped = res.data.map((item: any) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: String(item.id),
      }));
      setAstrologers(mapped);
    } catch (err: any) {
      setAstrologers([]);
      toast.error("Failed to fetch astrologers", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiServices(admin_users, "get");
      const mapped = response.data.map((item: any) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: String(item.id),
      }));
      setUsers(mapped);
    } catch (err: any) {
      setUsers([]);
      toast.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAstrologers();
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    watch,
    type,
    users,
    astrologers,
  };
};
