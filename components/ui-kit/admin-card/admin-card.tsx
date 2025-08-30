import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PhoneCall } from "lucide-react";

export const AdminCard = () => {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <CardHeader className="gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <PhoneCall className="w-5 h-5 text-gray-600" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Call Request
          </CardDescription>
          <CardTitle className="text-2xl font-bold">2127</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};
