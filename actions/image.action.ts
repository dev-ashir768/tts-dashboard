"use server";

export async function fetchExternalImageAsBase64(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const base64Str = `data:${contentType};base64,${buffer.toString("base64")}`;

    return base64Str;
  } catch (error) {
    console.error("Error fetching external image:", error);
    return null;
  }
}
