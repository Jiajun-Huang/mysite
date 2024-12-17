"use client";

import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";

interface TocItem {
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
      } else {
        setIsScrolled(false);
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
    <div className={`transition-all duration-300`}>
      <div>
        <strong>Table of Contents</strong>
      </div>
      <ul>
        {tocItems.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 2) * 20}px` }}
            className="hover:text-secondary"
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
      <div
        className={`${isScrolled ? "opacity-100" : "opacity-0"} transition-opacity duration-300 opacity-0 ${isScrolled ? "opacity-100" : ""}`}
      >
        <Divider className="my-4"/>
        <a href="#top">Back to top</a>
      </div>
    </div>
  );
}

export default Toc;
