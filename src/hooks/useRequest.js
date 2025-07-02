import { api } from "@/utils/api";

export const handleFetch = async (endPoint, params = {}) => {
  try {
    const queryString = Object.keys(params).length
      ? "?" + new URLSearchParams(params).toString()
      : "";

    const url = `${api}/${endPoint}${queryString}`;
    console.log("Fetch URL:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();
    console.log("Raw response text:", text);

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
