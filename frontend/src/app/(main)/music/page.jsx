"use client"; // Ensures the page is treated as a client-side component

import { BASE_URL } from "@/api/request";
import { useEffect } from "react";
import "./APlayer.min.css";
import "./custom.css";

// https://bbs.125.la/thread-14767706-1-1.html
// one ap :https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344

export default function Music() {
  useEffect(() => {
    let ap = null; // Declare APlayer instance
    const handleMediaKeyEvent = (event) => {
      if (ap) {
        switch (event.code) {
          case "Space":
          case "MediaPlayPause":
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
      }
    };

    // Async function to fetch music data
    const asyncFunction = async () => {
      try {
        const response = await fetch(BASE_URL + "/api/songlist/");
        if (!response.ok) {
          throw new Error("Failed to fetch playlist data");
        }

        const json = await response.json();
        console.log(json);
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

        // Media Session API integration
        if ("mediaSession" in navigator) {
          console.log("sdfasdf");
          const updateMediaSession = (index) => {
            const currentSong = ap.list.audios[index];
            console.log(currentSong);
            if (!currentSong) return;

            navigator.mediaSession.metadata = new MediaMetadata({
              title: currentSong.name,
              artist: currentSong.artist,
              album: "Playlist",
              artwork: [
                { src: currentSong.cover, sizes: "512x512", type: "image/png" },
              ],
            });
          };

          // Update metadata for the current song
          ap.on("listswitch", function (e) {
            console.log(e);
            updateMediaSession(e.index);
          });

          updateMediaSession(ap.list.index); // Initialize metadata for the first song

          navigator.mediaSession.setActionHandler("play", () => ap.play());
          navigator.mediaSession.setActionHandler("pause", () => ap.pause());
          navigator.mediaSession.setActionHandler("previoustrack", () =>
            ap.skipBack()
          );
          navigator.mediaSession.setActionHandler("nexttrack", () =>
            ap.skipForward()
          );

          navigator.mediaSession.setActionHandler("seekto", (seekTime) => {
            ap.seek(seekTime); // `ap.seek` is used to seek to the specific time in APlayer
          });
        }
        // Add event listener for media keys
        window.addEventListener("keydown", handleMediaKeyEvent);
      } catch (error) {
        console.error("Error loading playlist data: ", error);
      }
    };

    // Invoke async function
    asyncFunction();

    return () => {
      // Cleanup function on unmount
      if (ap) {
        ap.destroy(); // Destroy APlayer instance
        ap = null;
      }
      // Remove event listener for media keys
      window.removeEventListener("keydown", handleMediaKeyEvent);
    };
  }, []); // You can pass `theme` or other dependencies if needed

  return <div id="aplayer"></div>;
}
