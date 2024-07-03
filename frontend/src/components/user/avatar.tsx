"use client";

import Image from "next/image";

interface Props {
  user: number;
  width: number;
  height: number;
}

export default function Avatar({ user, width, height }: Prop) {
  return (
    <Image
      src={`http://localhost:3000/api/user/avatar?user=${user}`}
      alt="avatar"
      width={width}
      height={height}
    />
  );
}
