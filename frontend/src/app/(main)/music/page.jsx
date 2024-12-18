"use client"; // Ensures the page is treated as a client-side component

import { useEffect } from "react";
import "./APlayer.min.css";
import "./custom.css";


export default function Music() {
  useEffect(() => {
    let ap = null; // Declare APlayer instance

    const asyncFunction = async () => {
      const data = await fetch(
        "https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344"
      );
      const json = await data.json();

      const audioData = json.map((song) => ({
        name: song.title,
        artist: song.author,
        url: song.url,
        cover: song.pic,
        lrc: song.lrc,
      }));

      const APlayer = await import("./APlayer.min.js");
      ap = new APlayer.default({
        container: document.getElementById("aplayer"),
        lrcType: 3,
        audio: audioData,
        order: "random",
        preload: "auto",
      });
      console.log(theme);
    };

    asyncFunction();

    return () => {
      // Cleanup logic to destroy the APlayer instance
      if (ap) {
        ap.destroy();
        ap = null;
        console.log("APlayer instance destroyed.");
      }
    };
  }, []); // You can pass `theme` or other dependencies if needed

  return <div id="aplayer"></div>;
}
