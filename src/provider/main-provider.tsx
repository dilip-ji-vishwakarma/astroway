"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextTopLoader color="#E25016" showSpinner={false} zIndex={9999} />
      {children}
      <Toaster richColors />
    </SessionProvider>
  );
};
