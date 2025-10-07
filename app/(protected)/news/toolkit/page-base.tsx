/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useDataMutations } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Pencil,
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";
import { toast } from "sonner";
import { apiServices } from "@/lib/api.services";
import { news } from "@/lib/api-endpoints";

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
  const { data, pagination, handlePageChange } = useDataMutations(
    initialData,
    initialPagination
  );

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [tooglegId, setTooglegId] = useState<number | null>(null);

  const handleDelete = async (id: any) => {
    setDeletingId(id);
    try {
      const response = await apiServices(`${news}/${id}`, "delete");
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
      const response = await apiServices(`${news}/${id}/toggle`, "patch", {
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
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 cursor-pointer">
                <EllipsisVertical size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 rounded-xl shadow-xl border border-slate-100"
              >
                <DropdownMenuItem className="flex items-center gap-2 text-slate-700 hover:bg-slate-100">
                  <Pencil size={16} className="text-blue-500" />
                  <Link href={`/news/${item.id}`}>Edit News</Link>
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
            {item.image ? (
              <Image
                src={getImageUrl(item.image)}
                alt={item.channel}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              width={150}
                  height={150}
              />
            ) : (
              <Image
                src="/images/bannerImage_placeholder.png"
                alt={item.channel}
                width={500}
                height={240}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Link
                  className="text-[16px] text-blue-600 font-semibold hover:underline"
                  href={item.link}
                >
                  {item.channel}
                </Link>
                <span className="text-sm font-medium text-slate-500">
                  {formatSingleDate(item.date, true)}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
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
    </div>
  );
};