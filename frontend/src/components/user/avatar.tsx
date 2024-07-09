"use client";

import Image from "next/image";
interface Props {
  user: number;
  width: number;
  height: number;
}

export default function Avatar({ user, width, height }: Props) {
  return (
    <Image
      src={
        process.env.NEXT_PUBLIC_BACKEND_ADDR + `/api/user/avatar?user=${user}`
      }
      alt="avatar"
      width={width}
      height={height}
    />
  );
}
