"use client";

import { useEffect, useState } from "react";
import TocDisplayBig from "./tocDisplayBig";
import TocDisplaySmall from "./tocDisplaySmall";

export interface TocItem {
  id: string;
  level: number;
  text: string;
}

function Toc({ queryId }: { queryId: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  // Track the scroll position and set isScrolled if it's greater than 100vh
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsScrolled(true);
        // chanage --scroll-padding-top css variable to 4rem if isScrolled is true
        document.documentElement.style.setProperty(
          "--scroll-padding-top",
          "4rem"
        );
      } else {
        setIsScrolled(false);
        document.documentElement.style.setProperty("--scroll-padding-top", "0");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const contentElement = document.getElementById(queryId);

    if (!contentElement) {
      console.error("Element with id 'body-body' not found.");
      return;
    }

    const headers = contentElement.querySelectorAll("h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = [];

    headers.forEach((header) => {
      const level = parseInt(header.tagName[1]);
      const id = header.id;
      const text = header.textContent || "";
      tocItems.push({ id, level, text });
    });

    setTocItems(tocItems);
  }, [queryId]);

  return (
    <div className={`transition-all duration-300 hide-scrollbar`}>
      <div className="hidden md:block hide-scrollbar">
        <TocDisplayBig tocItems={tocItems} isScrolled={isScrolled} />
      </div>
      <div className="md:hidden">
        <TocDisplaySmall tocItems={tocItems} isScrolled={isScrolled} />
      </div>
    </div>
  );
}

export default Toc;
