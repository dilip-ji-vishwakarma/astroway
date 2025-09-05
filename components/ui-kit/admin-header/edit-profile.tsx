"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useDataMutation } from "./hook/use-data-mutation";
import Image from "next/image";

type EditProfileProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditProfile = ({ open, onOpenChange }: EditProfileProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const userData = session?.user;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      picture: null,
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        picture: null,
      });
    }
  }, [userData, reset]);

  const { onSubmit } = useDataMutation(onOpenChange);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription className="space-y-5">
              <>
                <Label
                  htmlFor="name"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Name"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors["name"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Your Name
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="email"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="email"
                      className=""
                      placeholder="Email"
                      onChange={onChange}
                      value={value}
                      readOnly
                    />
                  )}
                />
                {errors["email"] && (
                  <span className="text-red-500 text-sm ">
                    Please Enter Your Email
                  </span>
                )}
              </>
              <>
                <Label
                  htmlFor="picture"
                  className="text-slate-900 text-sm font-medium mb-2 block"
                >
                  Picture
                </Label>
                <Controller
                  name="picture"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange } }) => (
                    <Input
                      accept="image/jpeg,image/png,image/webp"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                          ];
                          if (!allowedTypes.includes(file.type)) {
                            alert("Only JPG, PNG, and WEBP files are allowed.");
                            return;
                          }
                          onChange(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  )}
                />
                {preview && (
                  <Image
                    width={100}
                    height={100}
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border mt-2"
                  />
                )}
              </>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="absolute bottom-0 w-full">
            <Button
              type="submit"
              className="w-full py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-[20px] h-[20px] animate-spin rounded-[50%] border-t-[#3498db] border-2 border-solid border-[#f3f3f3]"></span>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
