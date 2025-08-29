"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useDataMutation } from "../hook/use-data-mutation";


export const PageBase = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { message, setMessage, onSubmit } = useDataMutation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
    
      <div className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  className=""
                  placeholder="Email"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <div>
              {errors["email"] && (
                <span className="text-red-500 text-sm ">
                  Please Enter Your Email
                </span>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <div>
              {errors["password"] && (
                <span className="text-red-500 text-sm ">
                  Please Enter Password
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid">
        <Button type="submit" className="w-max">
          {isSubmitting ? (
            <span className="w-[30px] h-[30px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
          ) : (
            <span>Send inquiry</span>
          )}
        </Button>
      </div>
      {message && (
        <div
          className={`mt-4 ${
            message === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message === "success"
            ? "Message Sent Successfully"
            : "Message Not Sent"}
        </div>
      )}
    </form>
  );
};
