import { BASE_URL } from "@/api/request";
import Image from "next/image";

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
      src={BASE_URL + `/api/user/avatar?user=${userId}`}
      alt="avatar"
      width={width}
      height={height}
      className="object-contain object-top"
    />
  );
}
