
export const BASE_URL =
  "http://127.0.0.1:8000" || currentHost();

function currentHost() {
  return window.location.protocol + "//" + window.location.host;
}


  