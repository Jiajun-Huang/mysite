"use client";

import { UserProvider } from "@/components/user/state";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
