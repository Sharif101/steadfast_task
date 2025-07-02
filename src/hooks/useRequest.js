import { api } from "@/utils/api";

export const handleFetch = async (endPoint, params = {}) => {
  try {
    const queryString = Object.keys(params).length
      ? "?" + new URLSearchParams(params).toString()
      : "";

    const response = await fetch(
      `http://157.230.240.97:9999/api/v1/${endPoint}${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
