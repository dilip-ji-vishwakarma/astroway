/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useContext } from "react";

type ModulePermission = Record<string, {
  view?: boolean;
  edit?: boolean;
  create?: boolean;
  delete?: boolean;
}>;

const PermissionContext = createContext<ModulePermission>({})

export const PermissionProvider = ({ value, children }: any) => {
  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  )
}

export const usePermission = () => useContext(PermissionContext)
