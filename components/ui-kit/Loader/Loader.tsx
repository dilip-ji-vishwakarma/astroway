import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute m-auto inset-0">
      <div className="w-7 h-7 border-[3px] border-primary/10 border-t-primary border-b-primary rounded-full animate-spin m-auto" />
    </div>
  );
};
