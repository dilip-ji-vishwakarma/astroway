import type { Metadata } from "next";
import Permission from "./permission";

export const metadata: Metadata = {
  title: "Session",
};

export default function Page() {
  return <Permission />;
}
