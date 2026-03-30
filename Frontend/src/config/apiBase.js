export const baseURL =
  typeof window !== "undefined" &&
  window.location.hostname.includes("localhost")
    ? "http://localhost:3000/api"
    : `${typeof window !== "undefined" ? window.location.origin : ""}/api`;
