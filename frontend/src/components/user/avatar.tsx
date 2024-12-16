"use client";

import { BASE_URL } from "@/api/request";
import Image from "next/image";
interface Props {
  user: number;
  width: number;
  height: number;
}

export default function Avatar({ user, width, height }: Props) {
  console.log(BASE_URL + `/api/user/avatar?user=${user}`);
  return (
    <Image
      src={BASE_URL + `/api/user/avatar?user=${user}`}
      alt="avatar"
      width={width}
      height={height}
    />
  );
}
