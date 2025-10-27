/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  PhoneCall,
  MessageSquare,
  Users,
  Star,
  DollarSign,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const AdminCard = ({ metric }: any) => {

  const stats = [
    {
      label: "Call Requests",
      value: metric.callRequests,
      icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
      bg: "from-blue-500/10 to-blue-100",
      glow: "shadow-blue-200/60",
      link: "/callHistory",
    },
    {
      label: "Chat Requests",
      value: metric.chatRequests,
      icon: <MessageSquare className="w-6 h-6 text-pink-600" />,
      bg: "from-pink-500/10 to-pink-100",
      glow: "shadow-pink-200/60",
      link: "/chatHistory",
    },
    {
      label: "Total Customers",
      value: metric.totalCustomers,
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      bg: "from-emerald-500/10 to-emerald-100",
      glow: "shadow-emerald-200/60",
      link: "/customers",
    },
    {
      label: "Total Astrologers",
      value: metric.totalAstrologers,
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      bg: "from-yellow-500/10 to-yellow-100",
      glow: "shadow-yellow-200/60",
      link: "/astrologers/manage-astrologers",
    },
    {
      label: "Total Earnings",
      value: `₹${metric.totalEarning || 0}`,
      icon: <DollarSign className="w-6 h-6 text-indigo-600" />,
      bg: "from-indigo-500/10 to-indigo-100",
      glow: "shadow-indigo-200/60",
      link: "/earnings",
    },
    {
      label: "Stories Posted",
      value: metric.totalStories,
      icon: <BookOpen className="w-6 h-6 text-orange-600" />,
      bg: "from-orange-500/10 to-orange-100",
      glow: "shadow-orange-200/60",
      link: "/stories",
    },
  ];

  return (
    <div className="gap-5 flex mt-5 w-full flex-wrap">
      {stats.map((item, i) => (
        <Link key={i} href={item.link} className="w-[23%]">
          <Card
            className={`relative group cursor-pointer overflow-hidden rounded-2xl border border-white/60 backdrop-blur-xl bg-gradient-to-br ${item.bg} hover:shadow-lg ${item.glow} hover:-translate-y-2 transition-all duration-500`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/40 to-transparent transition-opacity duration-300"></div>

            <CardHeader className="relative flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <CardTitle className="text-4xl font-bold text-gray-800 ml-5">
                  {item.value}
                </CardTitle>
              </div>

              <CardDescription className="text-gray-600 font-medium mt-2 tracking-wide">
                {item.label}
              </CardDescription>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 flex items-center text-[#E25016] font-semibold text-sm">
                View Details
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};
