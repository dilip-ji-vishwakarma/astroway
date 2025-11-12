import type { Metadata } from "next";
import Permission from "./permission";

export const metadata: Metadata = {
  title: "News",
};

export default function Page() {
  return <Permission />;
}