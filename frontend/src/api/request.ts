export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_ADDR ||
  (typeof window !== "undefined"
    ? window.location.protocol + "//" + window.location.host
    : "http://localhost:8000");
