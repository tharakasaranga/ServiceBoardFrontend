import axios from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "";

const normalizeBaseUrl = (baseUrl) => {
  if (!baseUrl) {
    return "";
  }

  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    baseUrl.startsWith("http://")
  ) {
    return baseUrl.replace(/^http:\/\//, "https://");
  }

  return baseUrl;
};

const api = axios.create({
  baseURL: normalizeBaseUrl(rawBaseUrl),
});

export default api;