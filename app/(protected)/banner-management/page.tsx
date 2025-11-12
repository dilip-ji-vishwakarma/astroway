import { Metadata } from "next";
import React from "react";
import Permission from "./permission";

export const metadata: Metadata = {
  title: "Banner Management",
};

export default function Page() {
  return <Permission />;
}