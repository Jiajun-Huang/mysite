"use client"; // Ensures the page is treated as a client-side component

import { BASE_URL } from "@/api/request";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import "./APlayer.min.css";
import "./custom.css";

// https://bbs.125.la/thread-14767706-1-1.html
// one ap :https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344

export default function Music() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing APlayer...");
  const [ap, setAp] = useState(null);
  const [audioData, setAudioData] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  // Move the async function outside useEffect
  const fetchMusicData = async () => {
    try {
      setLoadingText("Fetching playlist data...");

      const response = await fetch(BASE_URL + "/api/songlist/");
      if (!response.ok) {
        throw new Error("Failed to fetch playlist data");
      }

      const json = await response.json();
      console.log(json);

      const fetchedAudioData = json.map((song) => ({
        name: song.name,
        artist: song.artist[0],
        url: BASE_URL + "/api/audio/" + song.id,
        cover: BASE_URL + "/api/cover/" + song.id,
        lrc: BASE_URL + "/api/lrc/" + song.id,
      }));

      // Update audioData state
      setAudioData(fetchedAudioData);
      return fetchedAudioData;
    } catch (error) {
      console.error("Error loading playlist data: ", error);
      setFetchError(true);
      throw error;
    }
  };

  const initializeAPlayer = async (initialAudioData = []) => {
    try {
      setLoadingText("Loading APlayer...");

      // Dynamically import APlayer
      const APlayer = await import("./APlayer.min.js");

      const aplayerInstance = new APlayer.default({
        container: document.getElementById("aplayer"),
        lrcType: 3,
        audio: initialAudioData, // Start with empty or provided audio data
        order: "random",
        preload: "auto",
      });

      return aplayerInstance;
    } catch (error) {
      console.error("Error initializing APlayer: ", error);
      throw error;
    }
  };

  const updateAPlayerPlaylist = (aplayerInstance, newAudioData) => {
    try {
      // Clear existing playlist
      aplayerInstance.list.clear();

      // Add new songs to the playlist
      newAudioData.forEach((audio) => {
        aplayerInstance.list.add(audio);
      });

      console.log("Playlist updated with", newAudioData.length, "songs");
    } catch (error) {
      console.error("Error updating APlayer playlist: ", error);
    }
  };

  const setupMediaSession = (aplayerInstance) => {
    // Media Session API integration
    if ("mediaSession" in navigator) {
      console.log("Setting up Media Session API");

      const updateMediaSession = (index) => {
        const currentSong = aplayerInstance.list.audios[index];
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
      aplayerInstance.on("listswitch", function (e) {
        console.log(e);
        updateMediaSession(e.index);
      });

      updateMediaSession(aplayerInstance.list.index); // Initialize metadata for the first song

      navigator.mediaSession.setActionHandler("play", () =>
        aplayerInstance.play()
      );
      navigator.mediaSession.setActionHandler("pause", () =>
        aplayerInstance.pause()
      );
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        aplayerInstance.skipBack()
      );
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        aplayerInstance.skipForward()
      );

      navigator.mediaSession.setActionHandler("seekto", (seekTime) => {
        aplayerInstance.seek(seekTime); // `aplayerInstance.seek` is used to seek to the specific time in APlayer
      });
    }
  };

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

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        // Wait a bit for the DOM to be ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // First, initialize APlayer with empty audio data
        const aplayerInstance = await initializeAPlayer(audioData);

        // Store the instance in state
        setAp(aplayerInstance);

        // Add event listener for media keys
        window.addEventListener("keydown", handleMediaKeyEvent);

        // Hide loading state initially (APlayer is ready, even if empty)
        setIsLoading(false);

        // Then fetch the music data in the background
        const fetchedAudioData = await fetchMusicData();

        // Update the APlayer with the fetched data
        updateAPlayerPlaylist(aplayerInstance, fetchedAudioData);

        // Setup media session after data is loaded
        setupMediaSession(aplayerInstance);
      } catch (error) {
        console.error("Error initializing music player: ", error);
        setLoadingText("Error loading music player");
        setIsLoading(false);
      }
    };

    // Handle page visibility change (when user switches tabs/apps)
    const handleVisibilityChange = () => {
      if (document.hidden && ap) {
        ap.pause();
      }
    };

    // Handle beforeunload (when navigating away)
    const handleBeforeUnload = () => {
      if (ap) {
        ap.pause();
      }
    };

    // Start the initialization after component mounts
    initializePlayer();

    // Add event listeners for page visibility and beforeunload
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup function on unmount
      if (ap) {
        // Pause the music first
        try {
          ap.pause();
        } catch (error) {
          console.log("Error pausing audio:", error);
        }

        // Destroy APlayer instance
        try {
          ap.destroy();
        } catch (error) {
          console.log("Error destroying APlayer:", error);
        }

        setAp(null);
      }

      // Remove all event listeners
      window.removeEventListener("keydown", handleMediaKeyEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array

  return (
    <div>
      {/* Always render the APlayer container */}
      <div id="aplayer"></div>

      {/* Show loading overlay when initializing */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <Spinner size="lg" />
          <p className="text-gray-600">{loadingText}</p>
        </div>
      )}

      {/* Show fetching message when APlayer is ready but no data */}
      {audioData.length == 0 && ap && !fetchError && (
        <div className="text-center text-gray-600 p-4 flex items-center justify-center">
          <Spinner size="sm" className="mr-2" />
          Fetching playlist data...
        </div>
      )}

      {/* Show error message when data fetching fails */}
      {fetchError && (
        <div className="text-red-500 text-center p-4">
          Failed to load playlist. Please try refreshing the page.
        </div>
      )}
    </div>
  );
}
