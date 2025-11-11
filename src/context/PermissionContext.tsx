/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useContext } from "react";

export type SinglePermission = {
  view?: boolean;
  edit?: boolean;
  create?: boolean;
  delete?: boolean;
};

export type PermissionCTX = {
  role: string;
  modules: {
    [key: string]: SinglePermission;
  };
};

const PermissionContext = createContext<PermissionCTX>({
  role: "",
  modules: {}
});

export const PermissionProvider = ({ value, children }: any) => {
  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
