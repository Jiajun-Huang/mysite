import Image from "next/image";

import { BASE_URL } from "@/api/request";

export default function UserAvartar({
  user: userId,
  width,
  height,
}: {
  user: number;
  width: number;
  height: number;
}) {
  return (
    <Image
      alt="avatar"
      className="object-contain object-top"
      height={height}
      src={BASE_URL + `/api/user/avatar?user=${userId}`}
      width={width}
    />
  );
}
