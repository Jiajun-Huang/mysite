"use client"; // Ensures the page is treated as a client-side component

// https://bbs.125.la/thread-14767706-1-1.html
// one ap :https://api.i-meto.com/meting/api?server=netease&type=playlist&id=7353465344

export default function Music() {
  useEffect(() => {
    async function initAPlayer() {
      // @ts-ignore
      const APlayer = (await import("aplayer")).default;
      const ap = new APlayer({
        container: document.getElementById(id),
        fixed: fixed,
        audio: audio,
      });
    }

    initAPlayer();
  }, [id, audio, fixed]);

  return <div id="aplayer"></div>;
}
