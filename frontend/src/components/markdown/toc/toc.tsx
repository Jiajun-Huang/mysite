"use client";

import { useEffect, useState } from "react";
import style from "./toc.module.scss";
interface TocItem {
  id: string;
  level: number;
  text: string;
}

function Toc() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const contentElement = document.getElementById("blog-body");
    const htmlElement = document.querySelector("html");
 

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
  }, []);

  return (
    <div className={style.toc}>
      <div>
        <strong>Table of Contents</strong>
      </div>
      <ul>
        {tocItems.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 2) * 20}px` }}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Toc;
