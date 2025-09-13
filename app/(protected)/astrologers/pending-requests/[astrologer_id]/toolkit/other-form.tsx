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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const OtherForm = ({ response, id }: any) => {
  const data = response.data;
  const { onSubmit, handleSubmit, control, isSubmitting, } =
    useDataMutation(id);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Other Detail</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="whyOnBoard"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Why do you think we should onboard you?
            </Label>
            <Controller
              name="whyOnBoard"
              control={control}
              defaultValue={data.whyOnBoard || ""}
              rules={{ required: true }}
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
          <div>
            <Label
              htmlFor="interviewTime"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              What is suitable time for interview?
            </Label>
            <Controller
              name="interviewTime"
              control={control}
              defaultValue={data.interviewTime || null}
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
          </div>
          <div>
            <Label
              htmlFor="city"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Which city do you currently live in?
            </Label>
            <Controller
              name="city"
              control={control}
              defaultValue={data.city || ""}
              rules={{ required: true }}
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
          <div className="w-full">
            <Label
              htmlFor="mainBusiness"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Main Source of business(Other than astrology)?
            </Label>
            <Controller
              name="mainBusiness"
              control={control}
              defaultValue={data.mainBusiness || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Business --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own-business">Own Business</SelectItem>
                    <SelectItem value="private-job">Private Job</SelectItem>
                    <SelectItem value="goverment-job">Goverment Job</SelectItem>
                    <SelectItem value="studying-in-college">
                      Studying in College
                    </SelectItem>
                    <SelectItem value="none-of-the-above">
                      None of the above
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="qualification"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Select your highest qualification
            </Label>
            <Controller
              name="qualification"
              control={control}
              defaultValue={data.qualification || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Qualification --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="post-graduated">
                      Post Graduated
                    </SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="degree"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Degree / Diploma
            </Label>
            <Controller
              name="degree"
              control={control}
              defaultValue={data.degree || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Degree --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                    <SelectItem value="B.Sc">B.Sc</SelectItem>
                    <SelectItem value="BA">BA</SelectItem>
                    <SelectItem value="BE">BE</SelectItem>
                    <SelectItem value="B.Com">B.Com</SelectItem>
                    <SelectItem value="B.Pharma">B.Pharma</SelectItem>
                    <SelectItem value="M.Tech">M.Tech</SelectItem>
                    <SelectItem value="MA">MA</SelectItem>
                    <SelectItem value="M.Sc">M.Sc</SelectItem>
                    <SelectItem value="MBBS">MBBS</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="university"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              College/School/University
            </Label>
            <Controller
              name="university"
              control={control}
              defaultValue={data.university || ""}
              rules={{ required: true }}
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
          <div>
            <Label
              htmlFor="learnedAstrologyBy"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              From where did you learn Astrology?
            </Label>
            <Controller
              name="learnedAstrologyBy"
              control={control}
              defaultValue={data.learnedAstrologyBy || ""}
              rules={{ required: true }}
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
          <div>
            <Label
              htmlFor="instagramUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Instagram profile link
            </Label>
            <Controller
              name="instagramUrl"
              control={control}
              defaultValue={data.instagramUrl || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="url"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="facebookUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Facebook profile link
            </Label>
            <Controller
              name="facebookUrl"
              control={control}
              defaultValue={data.facebookUrl || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="url"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="linkedinUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              LinkedIn profile link
            </Label>
            <Controller
              name="linkedinUrl"
              control={control}
              defaultValue={data.linkedinUrl || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="url"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="youtubeUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Youtube profile link
            </Label>
            <Controller
              name="youtubeUrl"
              control={control}
              defaultValue={data.youtubeUrl || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="url"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="websiteUrl"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Website profile link
            </Label>
            <Controller
              name="websiteUrl"
              control={control}
              defaultValue={data.websiteUrl || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="url"
                  className=""
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="minEarningExpect"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Minimum Earning Expection from Astroguru
            </Label>
            <Controller
              name="minEarningExpect"
              control={control}
              defaultValue={data.minEarningExpect ?? null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="maxEarningExpect"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Minimum Earning Expection from Astroguru
            </Label>
            <Controller
              name="maxEarningExpect"
              control={control}
              defaultValue={data.maxEarningExpect ?? null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="foreignCountries"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Number of the foreign countries you lived/travelled to?
            </Label>
            <Controller
              name="foreignCountries"
              control={control}
              defaultValue={data.foreignCountries ?? null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  className=""
                  onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                  value={value}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="workingFullTime"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Are you currently working a fulltime job?
            </Label>
            <Controller
              name="workingFullTime"
              control={control}
              defaultValue={data.workingFullTime || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Select Job --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No, I am working as part - timer or freelancer">
                      No, I am working as part - timer or freelancer
                    </SelectItem>
                    <SelectItem value="Yes, I am working somewhere as a full-timer">
                      Yes, I am working somewhere as a full-timer
                    </SelectItem>
                    <SelectItem value="no,I am not working anywhere else">
                      no,I am not working anywhere else
                    </SelectItem>
                    <SelectItem value="I own a business">
                      I own a business
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="referedBySomeone"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Did anybody refer you to Astroguru?
            </Label>
            <Controller
              name="referedBySomeone"
              control={control}
              defaultValue={data.referedBySomeone || "no"}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onValueChange={onChange} value={value}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="longBio"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              Long bio
            </Label>
            <Controller
              name="longBio"
              control={control}
              defaultValue={data.longBio}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Textarea className="" onChange={onChange} value={value} />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="goodQualities"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              What are some good qualities of perfect astrologer?
            </Label>
            <Controller
              name="goodQualities"
              control={control}
              defaultValue={data.goodQualities || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Textarea className="" onChange={onChange} value={value} />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="biggestChallenge"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              What was the biggest challenge you faced and how did you overcome
              it?
            </Label>
            <Controller
              name="biggestChallenge"
              control={control}
              defaultValue={data.biggestChallenge || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Textarea className="" onChange={onChange} value={value} />
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="repeatQuestions"
              className="text-slate-900 text-sm font-medium mb-2 block"
            >
              A customer is asking the same question repeatedly: what will you
              do?
            </Label>
            <Controller
              name="repeatQuestions"
              control={control}
              defaultValue={data.repeatQuestions || ""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Textarea className="" onChange={onChange} value={value} />
              )}
            />
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
