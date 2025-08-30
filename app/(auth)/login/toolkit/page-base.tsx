"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useDataMutation } from "../hook/use-data-mutation";
import Image from "next/image";
// import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail } from "lucide-react";

export const PageBase = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const { onSubmit, rememberMe, setMasked, masked } = useDataMutation();

  useEffect(() => {
    if (rememberMe === "true") {
      setValue("remember", true);
    }
  }, [rememberMe, setValue]);

  return (
    <div className="primary-color">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] mb-2 mx-auto block"
            />
            <h3 className="text-slate-900 text-center text-xl font-semibold">
              Astrology Prediction by Astrologers
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Email
                </Label>
                <div className="relative flex items-center">
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
                  <Mail className="w-4 h-4 absolute right-4" />
                </div>
                <div>
                  {errors["email"] && (
                    <span className="text-red-500 text-sm ">
                      Please Enter Your Email
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Password
                </Label>
                <div className="relative flex items-center">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type={masked ? "password" : "text"}
                        className=""
                        placeholder="Password"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    className="bg-[transparent] hover:bg-[transparent] w-4 h-4 absolute right-4 cursor-pointer"
                    onClick={() => {
                      setMasked(!masked);
                    }}
                  >
                    {masked ? (
                      <EyeOff
                        color="#000000"
                        className=" w-4 h-4 absolute right-[0px] cursor-pointer"
                      />
                    ) : (
                      <Eye
                        color="#000000"
                        className=" w-4 h-4 absolute right-[0px] cursor-pointer"
                      />
                    )}
                  </Button>
                </div>
                <div>
                  {errors["password"] && (
                    <span className="text-red-500 text-sm ">
                      Please Enter Password
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <Controller
                  name="remember"
                  control={control}
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="remember"
                        checked={value}
                        onCheckedChange={onChange}
                      />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                  )}
                />
              </div> */}
              <div className="mt-5 grid">
                <Button
                  type="submit"
                  className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};