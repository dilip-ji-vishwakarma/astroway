/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSingleDate, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const DataTable = ({ unverifiedAstrologers }: any) => {
  return (
    <>
    <h2 className="text-lg font-medium truncate mr-5 text-[#E25016]">Unverified Astrologers</h2>
    <Table className="mt-5">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="px-[20px] py-5">#</TableHead>
          <TableHead className="px-[20px] py-5">Profile</TableHead>
          <TableHead className="px-[20px] py-5">First Name</TableHead>
          <TableHead className="px-[20px] py-5">Last Name</TableHead>
          <TableHead className="px-[20px] py-5">Phone</TableHead>
          <TableHead className="px-[20px] py-5">Languages</TableHead>
          <TableHead className="px-[20px] py-5">Chat Bookings</TableHead>
          <TableHead className="px-[20px] py-5">Primary Skills</TableHead>
          <TableHead className="px-[20px] py-5">Approved</TableHead>
          <TableHead className="px-[20px] py-5">Create dAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unverifiedAstrologers.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="px-[20px] py-5">{item.id}</TableCell>
            <TableCell className="px-[20px] py-5">
              <Image
                  src={getImageUrl(item.avatarUrl)}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full"
                />
            </TableCell>
            <TableCell className="px-[20px] py-5">{item.firstName}</TableCell>
            <TableCell className="px-[20px] py-5">{item.lastName}</TableCell>
            <TableCell className="px-[20px] py-5">{item.phone}</TableCell>
            <TableCell className="px-[20px] py-5">
              {item.languages && item.languages.length > 0
                ? item.languages.join(", ")
                : "—"}
            </TableCell>
            <TableCell className="px-[20px] py-5">
              {item.chatBookings}
            </TableCell>
            <TableCell className="px-[20px] py-5">
              {item.primarySkills && item.primarySkills.length > 0
                ? item.primarySkills.join(", ")
                : "—"}
            </TableCell>
            <TableCell className="px-[20px] py-5">
              {item.isApproved ? "Yes" : "No"}
            </TableCell>
            <TableCell className="px-[20px] py-5">
              {formatSingleDate(item.createdAt, true)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};
