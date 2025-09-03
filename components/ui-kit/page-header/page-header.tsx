"use client";
import React, { ReactNode } from "react";

// Types
type PageHeaderProps = {
  children: ReactNode;
  containerVariation?: "fluid" | "default";
  height?: "s" | "m" | "l";
};

type PageHeaderLeftProps = {
  children: ReactNode;
};

type PageHeaderRightProps = {
  children: ReactNode;
};

type CallToActionButtonProps = {
  onClick: () => void;
  prependIcon?: ReactNode;
  children: ReactNode;
};

// Components
export const PageHeader = ({
  children,
  containerVariation = "default",
  height = "m",
}: PageHeaderProps) => {
  const heightClasses =
    height === "l" ? "h-14" : height === "m" ? "h-16" : "h-12";

  const containerClasses =
    containerVariation === "fluid" ? "w-full" : "max-w-7xl mx-auto";

  return (
    <div
      className={`flex  justify-between items-center ${containerClasses} ${heightClasses}`}
    >
      {children}
    </div>
  );
};

export const PageHeaderLeft = ({ children }: PageHeaderLeftProps) => (
  <div className="text-4xl border-l-4 border-[#F8D3C5] pl-3 font-semibold">{children}</div>
);

export const PageHeaderRight = ({ children }: PageHeaderRightProps) => (
  <div className="flex items-center gap-4">{children}</div>
);

export const CallToActionButton = ({
  onClick,
  prependIcon,
  children,
}: CallToActionButtonProps) => (
  <button
    onClick={onClick}
    className="cursor-pointer text-sm flex items-center gap-1 p-2 rounded-sm border border-solid border-[#E25016] text-[#E25016] hover:bg-[#E25016] hover:text-white transition font-medium"
  >
    {prependIcon && <span>{prependIcon}</span>}
    {children}
  </button>
);