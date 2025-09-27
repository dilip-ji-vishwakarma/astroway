import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center gap-10 text-center flex-col py-10">
      <Image
        width={699}
        height={380}
        alt=""
        src="/images/page-404-image.png"
        className="w-auto h-[330px]"
      />
      <div>
        <h1 className="md:text-4xl text-xl font-medium">{`Oops! That page can't be found.`}</h1>
        <p className="pt-3 pb-6">
          It looks like nothing was found at this location. Maybe try one of the
          links below or a search?
        </p>
        <Button className="max-w-max primary-color">
          <Link href="/dashboard">Go back to homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;