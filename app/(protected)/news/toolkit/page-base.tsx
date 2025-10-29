"use client";
import React from "react";
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
  Loader2,
} from "lucide-react";
import { useDataMutation } from "../hook/use-data-mutation";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";

export const PageBase = () => {
  const {
    data,
    pagination,
    handlePageChange,
    loading,
    handleLimitChange,
    deletingId,
    tooglegId,
    handleToogle,
    handleDelete,
  } = useDataMutation();

  return (
    <div className="mt-8 relative">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>

      {/* ===== Loader covering the grid ===== */}
      {loading && (
         <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      )}

      {/* ===== Card Grid ===== */}
      {!loading && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              {/* Dropdown Menu */}
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

              {/* Image */}
              {item.image ? (
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.channel}
                  width={500}
                  height={240}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
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

              {/* Content */}
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
      ) : (
        !loading && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No data available
          </div>
        )
      )}

      {/* ===== Pagination ===== */}
      {!loading && data.length > 0 && (
        <div className="flex justify-between items-center w-full mt-6">
          <MetaPagination
            total={pagination.total}
            value={pagination.page}
            recordPerPage={pagination.limit}
            onChange={handlePageChange}
          />
          <MetaPagination.PerPage
            value={pagination.limit}
            onChange={handleLimitChange}
          />
        </div>
      )}
    </div>
  );
};
