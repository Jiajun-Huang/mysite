"use client";

import { UserProvider } from "@/components/user/state";
import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/system";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <UserProvider>{children}</UserProvider>);
    </NextUIProvider>
  );
}
