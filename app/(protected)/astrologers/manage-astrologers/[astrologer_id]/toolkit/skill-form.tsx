/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryOption, languageOptions, primarySkillsOption } from "@/lib/options";

export const SkillForm = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, isSubmitting } =
    useDataMutation(id);

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
              rules={{ required: false}}
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
          </div>

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
              rules={{ required: false}}
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
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={categoryOption}
                  defaultValue={
                    Array.isArray(data.astrologerCategory)
                      ? data.astrologerCategory
                      : []
                  }
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Categories --"
                />
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="primarySkills"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Primary Skills
            </Label>
            <Controller
              name="primarySkills"
              control={control}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={primarySkillsOption}
                  defaultValue={
                    Array.isArray(data.primarySkills) ? data.primarySkills : []
                  }
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Skills --"
                />
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="allSkills"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              All Skills
            </Label>
            <Controller
              name="allSkills"
              control={control}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={primarySkillsOption}
                  defaultValue={
                    Array.isArray(data.allSkills) ? data.allSkills : []
                  }
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Skills --"
                />
              )}
            />
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
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={languageOptions}
                  defaultValue={
                    Array.isArray(data.languages) ? data.languages : []
                  }
                  value={value || []}
                  onValueChange={onChange}
                  placeholder="-- Select Language --"
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="voiceCallRate"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Add Your Charge(As per Minute)
            </Label>
            <Controller
              name="voiceCallRate"
              control={control}
              defaultValue={data.voiceCallRate}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="videoCallRate"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Add Your video charge(As per Minute)
            </Label>
            <Controller
              name="videoCallRate"
              control={control}
              defaultValue={data.videoCallRate}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                 onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="reportRate"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Add Your report charge(As per Minute)
            </Label>
            <Controller
              name="reportRate"
              control={control}
              defaultValue={data.reportRate}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="experienceYrs"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Experience In Years
            </Label>
            <Controller
              name="experienceYrs"
              control={control}
              defaultValue={data.experienceYrs}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="dailyContributionHrs"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              How many hours you can contribute daily?
            </Label>
            <Controller
              name="dailyContributionHrs"
              control={control}
              defaultValue={data.dailyContributionHrs}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="heardFrom"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Where did you hear about Astroguru?
            </Label>
            <Controller
              name="heardFrom"
              control={control}
              defaultValue={data.heardFrom || ""}
              rules={{ required: false}}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="flex gap-3 items-center">
            <Controller
              name="worksElsewhere"
              control={control}
              defaultValue={data.worksElsewhere || false}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="otherPlatforms"
              className="text-slate-900 text-sm font-medium block"
            >
              Are you working on any other platform?
            </Label>
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