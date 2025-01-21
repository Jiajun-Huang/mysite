"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
