/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalForm } from "./personal-form";
import { SkillForm } from "./skill-form";
import { OtherForm } from "./other-form";
import { AvailabilityForm } from "./availability-form";

export const PageBase = ({ response }: any) => {
    console.log(response);
  return (
    <Tabs defaultValue="personal" className="w-full mt-5">
      <TabsList className="w-full bg-[transparent]">
        <TabsTrigger className="cursor-pointer" value="personal">Personal Detail</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="skill">Skill Detail</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="other">Other Detail</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="availability">Availability</TabsTrigger>
      </TabsList>
      <div className="mt-5">
      <TabsContent value="personal">
        <PersonalForm />
      </TabsContent>
      <TabsContent value="skill"><SkillForm /></TabsContent>
      <TabsContent value="other"><OtherForm /></TabsContent>
       <TabsContent value="availability"><AvailabilityForm /></TabsContent>
       </div>
    </Tabs>
  );
};
