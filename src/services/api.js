import axios from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "";

const normalizeBaseUrl = (baseUrl) => {
  if (!baseUrl) {
    return "";
  }

  let normalizedUrl = baseUrl;

  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    baseUrl.startsWith("http://")
  ) {
    normalizedUrl = baseUrl.replace(/^http:\/\//, "https://");
  }

  try {
    const parsedUrl = new URL(normalizedUrl);

    if (
      parsedUrl.hostname.endsWith("vercel.app") &&
      !parsedUrl.pathname.replace(/\/$/, "").endsWith("/api")
    ) {
      parsedUrl.pathname = `${parsedUrl.pathname.replace(/\/$/, "")}/api`;
    }

    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return normalizedUrl;
  }
};

const api = axios.create({
  baseURL: normalizeBaseUrl(rawBaseUrl),
});

export default api;