"use client"; // Ensures the page is treated as a client-side component

import { useEffect } from "react";
import "./APlayer.min.css";
import "./custom.css";

// https://bbs.125.la/thread-14767706-1-1.html
// one ap :https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344
export default function Music() {
  useEffect(() => {
    let ap = null; // Declare APlayer instance

    // Async function to fetch music data
    const asyncFunction = async () => {
      try {
        const response = await fetch(
          "https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch playlist data");
        }

        const json = await response.json();
        const audioData = json.map((song) => ({
          name: song.title,
          artist: song.author,
          url: song.url,
          cover: song.pic,
          lrc: song.lrc,
        }));

        // Dynamically import APlayer
        const APlayer = await import("./APlayer.min.js");

        ap = new APlayer.default({
          container: document.getElementById("aplayer"),
          lrcType: 3,
          audio: audioData,
          order: "random",
          preload: "auto",
        });

        // Handle media key events (play/pause, next, previous)
        const handleMediaKeyEvent = (event) => {
          console.log(event.code);
          switch (event.code) {
            case "MediaPlayPause":
            case "Space":
              console.log("toggle");
              ap.toggle(); // Play/Pause
              break;

            case "KeyD":
            case "ArrowRight":
            case "MediaTrackNext":
              ap.skipForward(); // Next
              break;

            case "KeyA":
            case "ArrowLeft":
            case "MediaTrackPrevious":
              ap.skipBack(); // Previous
              break;
            default:
              break;
          }
        };

        // Add event listener for media keys
        window.addEventListener("keydown", handleMediaKeyEvent);

        // Cleanup on unmount
        return () => {
          if (ap) {
            ap.destroy(); // Destroy APlayer instance
            ap = null;
            console.log("APlayer instance destroyed.");
          }

          // Clean up media key event listener
          window.removeEventListener("keydown", handleMediaKeyEvent);
        };
      } catch (error) {
        console.error("Error loading playlist data: ", error);
      }
    };

    // Invoke async function
    asyncFunction();
  }, []); // You can pass `theme` or other dependencies if needed

  return <div id="aplayer"></div>;
}
