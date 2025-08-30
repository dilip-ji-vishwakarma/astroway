"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r bg-white dilip">
      <SidebarContent>
        <SidebarGroup>
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-5 mt-2 custom-shadow p-3 rounded-md">
            <Image src="/images/AdminLogo1756469947.png" width={60} height={60} alt="logo" />
            <Label className="text-[20px] primary-text font-medium">Astroway</Label>
          </div>

          {/* Menu label */}
          <SidebarGroupLabel className="uppercase primary-text text-xs tracking-wide px-4 mb-2">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible className="group/collapsible">
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
                        <div className="mt-2 space-y-2 ml-2 rounded-md p-2  custom-shadow">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.url}
                              className={`block text-sm px-2 py-[7px] rounded-md font-medium ${
                                pathname === child.url ? "primary-text" : "text-black"
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
                      className={`w-full font-medium flex items-center px-3 py-[10px] rounded-lg ${
                        pathname === item.url
                          ? "primary-color text-white hover:text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <item.icon
                          className={`h-4 w-4 ${
                            pathname === item.url ? "text-white" : "text-gray-500"
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