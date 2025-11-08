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
import ChangePassword from "./change-password";
// import { Button } from "@/components/ui/button";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

export const AdminHeader = ({ session }: any) => {
  const [openSheet, setOpenSheet] = useState(false);
  const [sheet, setSheet] = useState(false);
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };
  // const { setTheme } = useTheme()

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
        {/* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[35px] h-[35px] bg-[black] text-[white] text-xl rounded-full font-medium cursor-pointer">
            {session?.name
              ? session.name.split(" ")[0].charAt(0).toUpperCase()
              : "?"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>astroway admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpenSheet(true)}
            >
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setSheet(true)}
            >
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
      <ChangePassword open={sheet} onOpenChange={setSheet} />
    </>
  );
};
