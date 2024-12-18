export const BASE_URL = process.env.BACKEND_ADDR || currentHost();

function currentHost() {
  return window.location.protocol + "//" + window.location.host;
}
