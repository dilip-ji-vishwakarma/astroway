/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiServices } from "@/lib/api.services";
import { manage_astrologer } from "@/lib/api-endpoints";

type Astrologer = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};

type AstrologerListProps = {
  value?: string | number | null;
  onChange?: (value: number) => void;
  selectedAstrologer?: any;
  placeholder?: string;
  disabled?: boolean;
};

export const AstrologerList = ({ 
  value, 
  onChange, 
  selectedAstrologer,
  placeholder = "Select Astrologer",
  disabled = false 
}: AstrologerListProps) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await apiServices(
          `${manage_astrologer}?page=1&limit=100`,
          "get"
        );
        if (response?.data) {
          setList(
            response.data.map((item: any) => ({
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              phone: item.phone,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching astrologers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  // Find the currently selected astrologer by matching firstName, lastName, and phone
  const getCurrentSelectedAstrologer = () => {
    if (value && list.length > 0) {
      return list.find((a) => String(a.id) === String(value));
    }
    
    // If pre-selected astrologer is passed, find matching astrologer from the list
    if (selectedAstrologer && list.length > 0) {
      const matchedAstrologer = list.find((a) => 
        a.firstName === selectedAstrologer.firstName &&
        a.lastName === selectedAstrologer.lastName &&
        a.phone === selectedAstrologer.phone
      );
      return matchedAstrologer;
    }
    
    return null;
  };

  const currentSelected = getCurrentSelectedAstrologer();

  // Set initial value when astrologer list is loaded and selectedAstrologer is provided
  useEffect(() => {
    if (selectedAstrologer && list.length > 0 && !value && onChange) {
      const matchedAstrologer = list.find((a) => 
        a.firstName === selectedAstrologer.firstName &&
        a.lastName === selectedAstrologer.lastName &&
        a.phone === selectedAstrologer.phone
      );
      
      if (matchedAstrologer) {
        onChange(matchedAstrologer.id);
      }
    }
  }, [selectedAstrologer, list, value, onChange]);

const handleSelect = (astrologerId: string) => {
  if (onChange) {
    onChange(Number(astrologerId)); 
  }
  setOpen(false);
};

  const getDisplayText = () => {
    if (loading) return "Loading...";
    
    if (currentSelected) {
      return `${currentSelected.firstName} ${currentSelected.lastName} (${currentSelected.phone})`;
    }
    
    // If selectedAstrologer is provided but list is not loaded yet, show the selected astrologer
    if (selectedAstrologer && list.length === 0) {
      return `${selectedAstrologer.firstName} ${selectedAstrologer.lastName} (${selectedAstrologer.phone})`;
    }
    
    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className="w-full justify-between"
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 " align="start">
        <Command className="max-h-[200px]">
          <CommandInput placeholder="Search by name or phone..." />
          <CommandList>
            <CommandEmpty>No astrologer found.</CommandEmpty>
            <CommandGroup>
              {list.map((astrologer) => {
                const searchValue = `${astrologer.firstName} ${astrologer.lastName} ${astrologer.phone}`;
                const isSelected = String(currentSelected?.id) === String(astrologer.id);
                
                return (
                  <CommandItem
                    key={astrologer.id}
                    value={searchValue}
                    onSelect={() => handleSelect(String(astrologer.id))}
                    className="cursor-pointer"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {astrologer.firstName} {astrologer.lastName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {astrologer.phone}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};