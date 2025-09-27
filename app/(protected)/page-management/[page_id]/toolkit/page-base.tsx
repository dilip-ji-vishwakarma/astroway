/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnUndo,
  BtnRedo,
} from "react-simple-wysiwyg";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { apiServices } from "@/lib/api.services";
import { toast } from "sonner";

export const PageBase = ({ data }: any) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const extractBody = (html: string) => {
    if (!html) return "";
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1] : html;
  };

  useEffect(() => {
    setValue("content", extractBody(data.content));
  }, [data, setValue]);

  const onSubmit = async (formProp: any) => {
    try {
      const response = await apiServices(
        `/admin/pages/${data.id}`,
        "put",
        formProp
      );
      if (response?.success === true) {
        toast.success(response.message);
        window.location.reload();
        return response;
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Update Page</CardTitle>
          <CardAction className="flex items-center justify-between">
            <Controller
              name="isActive"
              control={control}
              defaultValue={data.isActive || ""}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <Switch
                  className="cursor-pointer"
                  checked={value}
                  onCheckedChange={(checked) => {
                    onChange(checked);
                  }}
                />
              )}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <>
            <Label className="text-slate-900 text-sm font-medium mb-2 block">
              Title
            </Label>
            <Controller
              name="title"
              control={control}
              defaultValue={data.title || ""}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Enter Title"
                  className="h-10"
                  {...field}
                />
              )}
            />
          </>
          {errors["title"] && (
            <span className="text-red-500 text-sm ">Please Enter Slug</span>
          )}
          <>
            <Controller
              name="content"
              control={control}
              defaultValue={extractBody(data.content)}
              render={({ field: { onChange, value } }) => (
                <EditorProvider>
                  <Editor
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    <Toolbar>
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnStrikeThrough />
                      <BtnNumberedList />
                      <BtnBulletList />
                      <BtnLink />
                      <BtnUndo />
                      <BtnRedo />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              )}
            />
          </>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="py-2 px-5 text-[15px] font-medium tracking-wide rounded-md text-white primary-color focus:outline-none cursor-pointer"
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
