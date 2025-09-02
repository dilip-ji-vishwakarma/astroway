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
        "text-4xl font-medium border-l-4 border-[#F8D3C5] pl-3",
        className
      )}
    >
      {children}
    </h1>
  );
};
