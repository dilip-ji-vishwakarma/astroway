/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useDataMutations } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Calendar1,
  EllipsisVertical,
  Video,
  Pencil,
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { UpdateBanner } from "./update-banner";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";
import { banner } from "@/lib/api-endpoints";

type PageBaseProps = {
  initialData: any[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const PageBase = ({ initialData, initialPagination }: PageBaseProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [tooglegId, setTooglegId] = useState<number | null>(null);
  const { data, pagination, handlePageChange } = useDataMutations(
    initialData,
    initialPagination
  );

  const handleDelete = async (id: any) => {
    setDeletingId(id);
    try {
      const response = await apiServices(`${banner}/${id}`, "delete");
      if (response?.success === true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToogle = async (id: number, currentStatus: boolean) => {
    setTooglegId(id);
    try {
      const response = await apiServices(`${banner}/status/${id}`, "patch", {
        isActive: !currentStatus,
      });

      if (response?.success === true) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setTooglegId(null);
    }
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 cursor-pointer">
                <EllipsisVertical size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 rounded-xl shadow-xl border border-slate-100"
              >
                <DropdownMenuItem
                  className="flex items-center gap-2 text-slate-700 hover:bg-slate-100"
                  onSelect={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  <Pencil size={16} className="text-blue-500" />
                  Edit Banner
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-100"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleToogle(item.id, item.isActive);
                  }}
                >
                  {tooglegId === item.id ? (
                    <span className="text-xs text-slate-500">Loading...</span>
                  ) : item.isActive ? (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <Circle size={16} className="text-gray-400" />
                      <span>Inactive</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleDelete(item.id);
                  }}
                >
                  {deletingId === item.id ? (
                    <span>Deleting...</span>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {item.url ? (
              <Image
                src={getImageUrl(item.url)}
                alt="banner"
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              width={150}
                  height={150}
              />
            ) : (
              <Image
                src="/images/bannerImage_placeholder.png"
                alt={item.channel}
                width={500}
                height={240}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 w-full backdrop-blur-md bg-white/20 p-4 text-white">
              <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-2">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar1 size={16} /> From
                </span>
                <span className="text-sm font-semibold">
                  {formatSingleDate(item.fromDate, true)}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-2">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar1 size={16} /> To
                </span>
                <span className="text-sm font-semibold">
                  {formatSingleDate(item.toDate, true)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm">
                  <Video size={16} /> Type
                </span>
                <span className="text-sm font-semibold">{item.bannerType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full mt-6">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
      <UpdateBanner
        open={open}
        onOpenChange={setOpen}
        data={selectedItem}
        id={selectedItem?.id}
      />
    </div>
  );
};