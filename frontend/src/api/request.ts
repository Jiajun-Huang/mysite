export const BASE_URL =
  process.env.BACKEND_ADDR || process.env.NEXT_PUBLIC_BACKEND_ADDR;
console.log(BASE_URL);
export const STORGE_URL =
  process.env.MINIO_STORAGE_URL || process.env.NEXT_PUBLIC_STORAGE_ADDR;


  