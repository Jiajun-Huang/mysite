
export const BASE_URL =
  "http://192.168.1.5:8000" || currentHost();

function currentHost() {
  return window.location.protocol + "//" + window.location.host;
}


  