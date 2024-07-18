"use client";

import mermaid from "mermaid";
import { useEffect, useState } from "react";
import { initializeMermaid } from "./useMermaid";
type Props = {
  children: string;
};

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  fontFamily: "Fira Code",
});

function Mermaid({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    initializeMermaid();
  }, [mounted]);

  if (!mounted) return null;

  return <div className="mermaid">{children}</div>;
}

export default Mermaid;
