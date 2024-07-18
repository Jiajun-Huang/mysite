import mermaid from "mermaid";

let isInitialized = false;

export function initializeMermaid() {
  if (!isInitialized) {
    console.log("initializing mermaid");
    mermaid.initialize({ startOnLoad: true });
    isInitialized = true;
  } else {
    mermaid.contentLoaded();
    console.log("content loaded");
  }
}
