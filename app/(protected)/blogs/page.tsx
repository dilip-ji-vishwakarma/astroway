import type { Metadata } from "next";
import Permission from "./permission";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function Page() {
  return <Permission />;
}
