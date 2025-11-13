/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { mainItems } from "@/lib/menuItems";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/src/context/PermissionContext";

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { setOpenMobile } = useSidebar();

  const { modules, role } = usePermission();

  const isParentActive = useCallback(
    (item: any) => {
      if (!item.children) return false;
      return item.children.some((child: any) => pathname === child.url);
    },
    [pathname]
  );

  useEffect(() => {
    setOpenMobile(false);
    const activeParents = mainItems
      .filter((item) => isParentActive(item))
      .map((item) => item.title);

    setOpenMenus((prev) => Array.from(new Set([...prev, ...activeParents])));
  }, [pathname, setOpenMobile, isParentActive]);

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-md">
          <Image src="/images/logo.png" width={50} height={50} alt="logo" />
          <Label className="text-[20px] primary-text font-medium">
            Astrova
          </Label>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase primary-text text-xs tracking-wide px-4 mb-2">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems
                .filter((item) => {
                  if (role === "superadmin") return true; // full

                  if (!item.children) {
                    return modules?.[item?.title]?.view === true;
                  }

                  return item.children?.some(
                    (c) => modules?.[c?.title]?.view === true
                  );
                })

                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.children ? (
                      <Collapsible
                        className="group/collapsible"
                        open={openMenus.includes(item.title)}
                        onOpenChange={(open) => {
                          if (open)
                            setOpenMenus((prev) => [...prev, item.title]);
                          else if (!isParentActive(item)) {
                            setOpenMenus((prev) =>
                              prev.filter((menu) => menu !== item.title)
                            );
                          }
                        }}
                      >
                        <CollapsibleTrigger asChild>
                          <Button className="w-full flex items-center justify-between px-3 py-[20px] rounded-lg hover:bg-gray-100 bg-white text-black cursor-pointer">
                            <span className="flex items-center space-x-2">
                              <item.icon className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{item.title}</span>
                            </span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-2 space-y-2 ml-2 rounded-md p-2 custom-shadow">
                            {item.children
                              .filter((child) =>
                                role === "superadmin"
                                  ? true
                                  : modules?.[child.title]?.view === true
                              )
                              .map((child) => (
                                <Link
                                  key={child.title}
                                  href={child.url}
                                  onClick={handleLinkClick}
                                  className={`block text-sm px-2 py-[7px] rounded-md font-medium ${
                                    pathname === child.url
                                      ? "primary-text"
                                      : "text-black"
                                  }`}
                                >
                                  {child.title}
                                </Link>
                              ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={item.url}
                        onClick={handleLinkClick}
                        className={`w-full font-medium flex items-center px-3 py-[10px] rounded-lg ${
                          pathname === item.url
                            ? "primary-color text-white hover:text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <item.icon
                            className={`h-4 w-4 ${
                              pathname === item.url
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="text-sm">{item.title}</span>
                        </span>
                      </Link>
                    )}
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
