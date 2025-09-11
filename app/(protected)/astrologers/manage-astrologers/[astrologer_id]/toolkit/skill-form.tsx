/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDataMutation } from "../hook/use-data-mutations";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { MultiSelect } from "@/components/ui/multi-select";
import { categoryOption, languageOptions } from "./options";

export const SkillForm = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, errors, isSubmitting, reset } =
    useDataMutation(id);

    useEffect(() => {
    if (data) {
      reset({
        astrologerCategory: Array.isArray(data.astrologerCategory) ? data.astrologerCategory : [],
        languages: Array.isArray(data.languages) ? data.languages : []
      });
    }
  }, [data, reset]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6">
          {/* Gender Dropdown */}
          <div className="w-full">
            <Label
              htmlFor="gender"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Select Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              defaultValue={data.gender || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Gender --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors["gender"] && (
              <span className="text-red-500 text-sm">
                Please select your gender
              </span>
            )}
          </div>

          {/* Date Picker */}
          <div className="w-full">
            <Label
              htmlFor="dateOfBirth"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Birth Date
            </Label>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={data.dateOfBirth || null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!value}
                      className="w-full data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value ? (
                        format(new Date(value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={value ? new Date(value) : undefined}
                      onSelect={(selectedDate) =>
                        onChange(
                          selectedDate ? selectedDate.toISOString() : null
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors["dateOfBirth"] && (
              <span className="text-red-500 text-sm">
                Please select your date of birth
              </span>
            )}
          </div>
          <div className="w-full">
            <Label
              htmlFor="astrologerCategory"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Astrologer Category
            </Label>
            <Controller
              name="astrologerCategory"
              control={control}
            //   defaultValue={Array.isArray(data.astrologerCategory) ? data.astrologerCategory : []}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={categoryOption}
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Categories --"
                />
              )}
            />
            {errors["astrologerCategory"] && (
              <span className="text-red-500 text-sm">
                Please select at least one category
              </span>
            )}
          </div>
          <div className="w-full">
            <Label
              htmlFor="languages"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Language
            </Label>
            <Controller
              name="languages"
              control={control}
            //   defaultValue={Array.isArray(data.languages) ? data.languages : []}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={languageOptions}
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Language --"
                />
              )}
            />
            {errors["astrologerCategory"] && (
              <span className="text-red-500 text-sm">
                Please select at least one category
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-[150px] py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
            ) : (
              <span>Update</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
