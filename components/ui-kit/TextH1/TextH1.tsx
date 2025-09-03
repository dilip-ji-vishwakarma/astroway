import React from "react";
import { cn } from "@/lib/utils";

type TextH1Props = {
  children: React.ReactNode;
  className?: string;
};

export const TextH1 = ({ children, className }: TextH1Props) => {
  return (
    <h1
      className={cn(
        "md:text-4xl text-xl font-medium border-l-4 border-[#F8D3C5] md:pl-3 pl-1",
        className
      )}
    >
      {children}
    </h1>
  );
};
