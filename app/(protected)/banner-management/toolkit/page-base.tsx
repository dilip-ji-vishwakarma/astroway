/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useDataMutations } from "../hook/use-data-mutations";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Calendar1, EllipsisVertical, Video, Pencil, Trash2, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";

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
                <DropdownMenuItem className="flex items-center gap-2 text-slate-700 hover:bg-slate-100">
                  <Pencil size={16} className="text-blue-500" />
                  <Link href={`/news/${item.id}`}>Edit Banner</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 text-slate-700 hover:bg-slate-100">
                  {item.isActive ? (
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

                <DropdownMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {item.url ? (
              <img
                src={getImageUrl(item.url)}
                alt="banner"
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
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
        <MetaPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
