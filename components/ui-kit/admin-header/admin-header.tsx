/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditProfile from "./edit-profile";

export const AdminHeader = ({ session }: any) => {
  const [openSheet, setOpenSheet] = useState(false);
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb paths
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="font-medium">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <>
    <div className="admin-header flex justify-between items-center px-3 py-2 bg-[#e2501640] custom-shadow">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="cursor-pointer size-10 primary-color text-white font-bold hover:text-white" />
        <div className="flex items-center gap-2.5 p-3 rounded-md md:hidden">
          <Image src="/images/logo.png" width={30} height={30} alt="logo" />
        </div>

        <div>
          <Breadcrumb className="font-medium">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="hover:primary-text" href="/">
                    Astrova
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {segments.length > 0 && <BreadcrumbSeparator />}
              {breadcrumbs}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-[35px] h-[35px] bg-[black] text-[white] text-xl rounded-full font-medium cursor-pointer">
          {session?.name
            ? session.name.split(" ")[0].charAt(0).toUpperCase()
            : "?"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>astroway admin</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenSheet(true)}
          >
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer bg-[#f3f4f6] border border-solid border-[#E25016]"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
     <EditProfile open={openSheet} onOpenChange={setOpenSheet} />
    </>
  );
};
