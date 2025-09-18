/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type SlugProps = {
  params: any;
};

const Slug = async ({ params }: SlugProps) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default Slug