/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CirclePlus, X } from "lucide-react";
import { useDataMutation } from "../hook/use-data-mutations";

export const AvailabilityForm = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, isSubmitting } =
    useDataMutation(id);

  // Define all days of the week
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Local state to manage multiple time slots per day
  const [availability, setAvailability] = useState<any[]>(() => {
    return allDays.map((day) => {
      const existingData = data.availability.filter(
        (dayItem: any) => dayItem.day === day
      );

      if (existingData.length > 0) {
        // If data exists for this day, group all time slots for that day
        return {
          day,
          times: existingData.map((item: any) => ({
            from: item.from || "",
            to: item.to || "",
          })),
        };
      } else {
        // If no data exists for this day, create empty structure
        return {
          day,
          times: [],
        };
      }
    });
  });

  const handleAddTime = (dayIndex: number) => {
    const updated = [...availability];
    updated[dayIndex].times.push({ from: "", to: "" });
    setAvailability(updated);
  };

  const handleRemoveTime = (dayIndex: number, timeIndex: number) => {
    const updated = [...availability];
    updated[dayIndex].times.splice(timeIndex, 1);
    setAvailability(updated);
  };

  return (
    <form
      onSubmit={handleSubmit(async () => {
  const flattened = availability.flatMap((day) =>
    day.times
      .filter((t: any) => t.from && t.to)
      .map((t: any) => ({
        day: day.day,
        from: t.from,
        to: t.to,
      }))
  );

  await onSubmit({ availability: flattened }); // <-- must await
})}
    >
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {availability.map((dayItem, dayIndex) => (
            <div key={dayItem.day}>
              <div className="flex gap-2 items-center mb-2">
                <Label className="text-[#E25016] text-sm font-medium block">
                  {dayItem.day}
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleAddTime(dayIndex)}
                  className="cursor-pointer"
                >
                  <CirclePlus />
                </Button>
              </div>

              {dayItem.times.length === 0 && (
                <div className="text-gray-500 text-sm italic mb-2">
                  No availability set for this day. Click + to add time slots.
                </div>
              )}

              {dayItem.times.map((time: any, timeIndex: number) => (
                <div
                  key={timeIndex}
                  className="grid grid-cols-2 gap-6 items-end mb-2 relative"
                >
                  <div className="w-full">
                    <Label className="text-slate-900 text-sm font-medium mb-2 block">
                      From
                    </Label>
                    <Controller
                      name={`availability[${dayIndex}][${timeIndex}].from`}
                      control={control}
                      defaultValue={time.from}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="time"
                          value={value}
                          className="w-full block"
                          onChange={(e) => {
                            onChange(e);
                            const updated = [...availability];
                            updated[dayIndex].times[timeIndex].from =
                              e.target.value;
                            setAvailability(updated);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <Label className="text-slate-900 text-sm font-medium mb-2 block">
                      To
                    </Label>
                    <Controller
                      name={`availability[${dayIndex}][${timeIndex}].to`}
                      control={control}
                      defaultValue={time.to}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          type="time"
                          value={value}
                          className="w-full block"
                          onChange={(e) => {
                            onChange(e);
                            const updated = [...availability];
                            updated[dayIndex].times[timeIndex].to =
                              e.target.value;
                            setAvailability(updated);
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* X icon to remove time slot */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 hover:bg-red-50"
                    onClick={() => handleRemoveTime(dayIndex, timeIndex)}
                  >
                    <X className="text-red-500 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ))}
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
