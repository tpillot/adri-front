import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export async function fetchStrapi<T>(path: string): Promise<T> {
  const url = new URL(`${API_URL}/api${path}`);

  if (!url.searchParams.has("populate")) {
    url.searchParams.set("populate", "*");
  }

  const res = await axios.get<T>(url.href, {
    headers: { "Content-Type": "application/json" },
  });
  
  return res.data;
}
