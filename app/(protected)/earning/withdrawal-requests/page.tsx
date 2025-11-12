import type { Metadata } from "next";
import Permission from "./permission";

export const metadata: Metadata = {
  title: "Withdrawal Requests",
};

export default function Page() {
  return <Permission />;
}


