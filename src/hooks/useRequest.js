import { api } from "@/utils/api";

export const handleFetch = async (endPoint, params = {}) => {
  try {
    const queryString = Object.keys(params).length
      ? "?" + new URLSearchParams(params).toString()
      : "";

    console.log("Fetch URL:", `${api}/${endPoint}${queryString}`); // <-- debug

    const response = await fetch(`${api}/${endPoint}${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
