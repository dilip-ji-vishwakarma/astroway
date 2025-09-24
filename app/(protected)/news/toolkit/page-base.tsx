/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useDataMutations } from "../hook/use-data-mutations";
import { useForm } from "react-hook-form";
import { MetaPagination } from "@/components/ui-kit/meta-pagination/meta-pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

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
  const { data, pagination, loading, handlePageChange } = useDataMutations(
    initialData,
    initialPagination
  );
  const { control } = useForm();
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <Card key={index} className="gap-3 group py-3">
            <CardHeader className="relative px-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-[30px] h-[30px] bg-[#00000030] text-[white] text-xl rounded font-medium cursor-pointer flex items-center justify-center absolute right-[16px] top-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 focus-visible:outline-0">
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-1" align="end">
                  <DropdownMenuItem>
                    <Link href={`/news/${item.id}`}>Edit News</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Delete News
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <CardTitle>
                {item.image ? (
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.channel}
                    className="transition duration-300 group-hover:brightness-50 w-full h-[200px] object-cover"
                  />
                ) : (
                  <Image
                    src="/images/bannerImage_placeholder.png"
                    alt={item.channel}
                    width={500}
                    height={500}
                    className="transition duration-300 group-hover:brightness-50 w-full h-[200px] object-cover"
                  />
                )}
              </CardTitle>
              <CardDescription className="flex justify-between mt-1">
                <Link
                  className="text-[16px] text-[#0000ff] font-medium"
                  href={item.link}
                >
                  {item.channel}
                </Link>
                <span className="font-medium">
                  {formatSingleDate(item.date, true)}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 text-balance font-normal">
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end w-full mt-4">
        <MetaPagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
