/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
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
  Loader2,
} from "lucide-react";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { UpdateBanner } from "./update-banner";
import { useDataMutation } from "../hook/use-data-mutation";
import { MetaPagination } from "@/components/ui-kit/meta-paginations/meta-pagination";
import { Label } from "@/components/ui/label";
import { usePermission } from "@/src/context/PermissionContext";

export const PageBase = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const {
    data,
    pagination,
    loading,
    handlePageChange,
    handleLimitChange,
    handleDelete,
    handleToogle,
    deletingId,
    tooglegId,
  } = useDataMutation();

  const { modules, role } = usePermission();
  const canEdit = role === "superadmin" || modules?.["Banner Management"]?.edit;
  const canDelete =
    role === "superadmin" || modules?.["Banner Management"]?.delete;

  return (
    <div className="mt-5 relative">
      <Label className="text-md font-semibold">{`${pagination.total} Listings`}</Label>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 transition-opacity duration-300 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              {(canEdit || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 cursor-pointer">
                    <EllipsisVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 rounded-xl shadow-xl border border-slate-100"
                  >
                    {canEdit && (
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
                    )}
                    <DropdownMenuSeparator />
                    {canEdit && (
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-100"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleToogle(item.id, item.isActive);
                        }}
                      >
                        {tooglegId === item.id ? (
                          <span className="text-xs text-slate-500">
                            Loading...
                          </span>
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
                    )}
                    <DropdownMenuSeparator />
                    {canDelete && (
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
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {item.url ? (
                <Image
                  src={getImageUrl(item.url)}
                  alt="banner"
                  width={150}
                  height={150}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <Image
                  src="/images/bannerImage_placeholder.png"
                  alt="placeholder"
                  width={500}
                  height={240}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Banner Details */}
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
                  <span className="text-sm font-semibold">
                    {item.bannerType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
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

      {/* Update Modal */}
      <UpdateBanner
        open={open}
        onOpenChange={setOpen}
        data={selectedItem}
        id={selectedItem?.id}
      />
    </div>
  );
};