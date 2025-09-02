"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchAndFilterProps = {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchAndFilter = ({
  value,
  placeholder = "Search...",
  onChange,
  label,
}: SearchAndFilterProps) => {
  return (
    <div className="flex items-center w-full">
      {label && (
        <Label htmlFor="listing" className="mr-5 text-md">
          {label}
        </Label>
      )}

      <div className="relative flex-1 flex justify-end">
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`transition-all duration-300 ease-in-out w-full opacity-100`}
        />
      </div>
    </div>
  );
};
