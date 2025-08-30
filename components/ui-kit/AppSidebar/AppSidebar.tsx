"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { mainItems } from "@/lib/menuItems";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <Sidebar className="border-r bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-gray-400 text-xs tracking-wide px-4">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    // Button for items with children
                    <div>
                      <SidebarMenuButton asChild>
                        <Button
                          onClick={() => toggleDropdown(item.title)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 bg-white text-black"
                        >
                          <span className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{item.title}</span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform cursor-pointer ${
                              openDropdown === item.title ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </Button>
                      </SidebarMenuButton>
                      {/* Dropdown Submenu */}
                      {openDropdown === item.title && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.url}
                              className="block text-sm px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Link for items without children
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="w-full font-medium flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 bg-white "
                      >
                        <span className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-black">{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
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
