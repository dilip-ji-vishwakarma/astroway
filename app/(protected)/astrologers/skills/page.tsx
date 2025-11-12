import type { Metadata } from "next";
import Permission from "./permission";
import { Suspense } from "react";
import { Loader } from "@/components/ui-kit/Loader";

export const metadata: Metadata = {
  title: "Skills",
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Permission />
    </Suspense>
  );
}
