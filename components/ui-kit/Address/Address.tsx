/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/options";

type AddressProps = {
  control: any;
  data: any;
};

export const Address = ({ control, data }: AddressProps) => {
  return (
    <div className="col-span-2 mt-4">
      <h3 className="text-lg font-semibold mb-4">Address Details</h3>
      <div className="grid grid-cols-2 gap-6">
        {/* City */}
        <div>
          <Label
            htmlFor="city"
            className="text-slate-900 text-sm font-medium mb-2 block"
          >
            City
          </Label>
          <Controller
            name="city"
            control={control}
            defaultValue={data.city || ""}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} />
            )}
          />
        </div>

        {/* State */}
        <div>
          <Label
            htmlFor="state"
            className="text-slate-900 text-sm font-medium mb-2 block"
          >
            State
          </Label>
          <Controller
            name="state"
            control={control}
            defaultValue={data.state || ""}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} />
            )}
          />
        </div>

        {/* Country */}
        <div>
          <Label
            htmlFor="country"
            className="text-slate-900 text-sm font-medium mb-2 block"
          >
            Country
          </Label>
          <Controller
            name="country"
            control={control}
            defaultValue={data.country || ""}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Select Country --" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Pincode */}
        <div>
          <Label
            htmlFor="pincode"
            className="text-slate-900 text-sm font-medium mb-2 block"
          >
            Pincode
          </Label>
          <Controller
            name="pincode"
            control={control}
            defaultValue={data.pincode || ""}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input type="text" onChange={onChange} value={value} />
            )}
          />
        </div>
      </div>
    </div>
  );
};
